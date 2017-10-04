const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { User, Entry } = require('./models/models.js');
const debug = process.env.DEBUG || true;
const jwt = require('jsonwebtoken');
const { jwtOptions, jwtAuth, pwdAuth } = require('./auth/auth.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const httpsRoute = function (req, res, next) {
  if (debug) { console.log((req.secure ? 'Secure' : 'Insecure') + ' connection received to: ', req.url); }
  if (req.secure) { next(); } else { res.redirect('https://' + req.hostname + ':3100' + req.path); }
};
// redirect non secure traffic to https
app.get('*', httpsRoute);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/entries', jwtAuth(), (req, res) => {
  Entry.find({userId: ObjectId(req.user._id)})
    .limit(req.query.limit ? req.query.limit * 1 : 5).sort({datetime: -1})
    .exec().then(entries => {
      res.status(200).json(entries);
    }).catch(err => res.status(500).send('Server error: ', err));
});

app.get('/api/users/formconfig', jwtAuth(), (req, res) => {
  User.findOne({username: req.user.username}).select('username ingredients physical emotional').exec()
    .then(config => {
      res.status(200).json(config);
    });
});

app.post('/api/users/login', pwdAuth(), (req, res) => {
  const newJWT = jwt.sign({username: req.body.username}, jwtOptions.secretOrKey);
  res.json({message: 'Login Successful!', token: newJWT});
});

app.post('/api/users/signup', (req, res) => {
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
  if (debug) { console.log('Posting formdata for: ', req.user); }
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

module.exports = app;
