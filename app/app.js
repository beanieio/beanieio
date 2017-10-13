// libraries
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// multer
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

// clarifai
const Clarifai = require('clarifai');
if (!process.env.PRODUCTION) {
  const configKey = require('../config/config');
}

// db setup
const { User, Entry } = require('./models/models.js');
const ObjectId = require('mongoose').Types.ObjectId;

// env setup
const debug = process.env.DEBUG || false;
const httpPort = process.env.PORT || 8080;
// const httpsPort = process.env.HTTPS_PORT || 8443;

// auth setup
const jwt = require('jsonwebtoken');
const { jwtOptions, jwtAuth, pwdAuth } = require('./auth/auth.js');

// helper scripts
const correlationHandler = require('./handlers/correlation-data.js');

// setting up server
const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// redirect non secure traffic to https
// const httpsRoute = function (req, res, next) {
//   if (debug) { console.log((req.secure ? 'Secure' : 'Insecure') + ' connection received to: ', req.url); }
//   if (req.secure) { next(); } else { res.redirect('https://' + req.hostname + req.path); }
// };
// app.get('*', httpsRoute);

app.use(express.static(path.join(__dirname, '..', 'public')));

//====== API ROUTES START HERE =====\\
// prefix all API routes with /api/ in order to explicitly identify them
// all API routes to get data should be protected with jwtAuth()
// all login routes should be prefixed with their respective passport strategy authentication helper
// for now this is just: pwdAuth()

app.get('/api/entries', jwtAuth(), (req, res) => {
  if (debug) { console.log('Get request entries for: ', req.user); }
  let q = {userId: ObjectId(req.user._id)};
  if (req.query.type) { q.type = req.query.type; }
  Entry.find(q).limit(req.query.limit ? req.query.limit * 1 : 5).sort({datetime: -1})
    .exec().then(entries => {
      res.status(200).json(entries);
    }).catch(err => res.status(500).send('Server error: ', err));
});

app.get('/api/reports/correlation', jwtAuth(), correlationHandler);

app.get('/api/users/formconfig', jwtAuth(), (req, res) => {
  if (debug) { console.log('Get request formconfig for: ', req.user); }
  User.findOne({username: req.user.username}).select('-_id ingredients physical emotional').exec()
    .then(config => {
      res.status(200).json(config);
    });
});

app.put('/api/users/formconfig', jwtAuth(), (req, res) => {
  if (debug) { console.log('Post request formconfig for: ', req.user); }
  if (debug) { console.log('Formconfig data posted is: ', req.body); }
  User.findOneAndUpdate({username: req.user.username}, {[req.body.type]: req.body.configData})
    .exec().then(() => res.status(200).send('config updated'))
    .catch(err => res.status(500).send('Server error: ', err));
});

app.post('/api/users/login', pwdAuth(), (req, res) => {
  if (debug) { console.log('Login attempt for: ', req.body.username); }
  const newJWT = jwt.sign({username: req.body.username}, jwtOptions.secretOrKey);
  res.json({message: 'Login Successful!', token: newJWT});
});

app.post('/api/users/signup', (req, res) => {
  if (debug) { console.log('Signup for: ', req.body.username); }
  User.findOne({username: req.body.username})
    .then(user => {
      if (user) {
        res.status(422).send('Username taken. Please enter a new username.');
      }
      let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      });
      return newUser.save();
    })
    .then(() => {
      const newJWT = jwt.sign({username: req.body.username}, jwtOptions.secretOrKey);
      res.status(201).send({message: 'Thank you for signing up!', token: newJWT});
    }).catch(err => res.status(500).send('Server err: ', err));
});

app.post('/api/formdata', jwtAuth(), (req, res) => {
  if (debug) { console.log('Post request formdata for: ', req.user); }
  if (debug) { console.log('Form data is: ', req.body); }
  const entry = new Entry({
    userId: req.user._id,
    datetime: req.body.datetime,
    type: req.body.type,
    ingredients: req.body.ingredients,
    sleepDuration: req.body.slDuration,
    sleepQuality: req.body.slQuality,
    exerciseDuration: req.body.excDuration,
    exerciseIntensity: req.body.excIntensity,
    waterAmount: req.body.waterAmount,
    physicalScore: req.body.phys,
    emotionalScore: req.body.emo,
    physicalTags: req.body.physTags,
    emotionalTags: req.body.emoTags
  });
  return entry.save(entry)
    .then(() => res.status(201).send('Entry created'))
    .catch(err => res.status(500).send('Server error', err));
});

// Post route for single images to be saved to disk and analyzed by Clarifai visual recognition.
// upload.fields is mutler middleware that requires formData with a name field.
// File size is currently limited to 10mb through bodyParser.
app.post('/api/clarifai', upload.fields([{ name: 'image' }]), (req, res, next) => {
  //console.log('Uploads a picture --> ',req.files.image[0].path)
  // get uploaded image file path and add to request
  let originalImageFilePath = path.join(__dirname, '/../', req.files.image[0].path);
  req.imagePath = originalImageFilePath;
  next();
}, (req, res) => {
  // read image file from uploads folder
  fs.readFile(req.imagePath, (err, data) => {
    if(err) {
      console.log('Read Image File Error: ', err);
      res.status(500).send('Server error', err);
    } else {
    // create new clarifai instance using API key
    let clarifaiApp = new Clarifai.App({apiKey: process.env.CLARIFAI_KEY || configKey.clarifaiKey});
    // Save image from memory buffer to Base64 for Clarifai API bytes option
    let imageBase64 = new Buffer(data).toString('base64');
    // use specific 'food' model("bd..." string) and object with our base64 image
    clarifaiApp.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64: imageBase64 }).then(
      (results) => {
        // results.outputs is the parent array of objects where our food prediction data is stored
        console.log('Clarifai Success: ', results.outputs);
        res.send(results.outputs);
      },
      (err) => {
        console.log('Clarifai Error: ', err);
        res.status(500).send('Server error', err);
      }
    );
    }
  })
});

app.post('/picture',(req,res) => {

  console.log('Req.body ---> ',req.body);
  console.log('Req.file --> ',req.file);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

// END API ROUTES

module.exports.app = app;
module.exports.httpPort = httpPort;
// module.exports.httpsPort = httpsPort;
