const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { User, Entry } = require('./models/models.js')
const debug = process.env.DEBUG || false;
const jwt = require('jsonwebtoken')
const helpers = require('./auth/auth.js')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/entries', (req, res) => {
  Entry.find()
  .then((entry) => {
    res.status(200).json(entry)
  })
})

app.post('/api/users/login', (req, res) => {
  const newJWT = jwt.sign({username: req.body.username}, helpers.jwtOptions.secretOrKey);
  res.json({message: 'Login Successful!', token: token});
});

app.post('/api/users/signup', (req, res) => {
  User.findOne({username: req.body.username})
  .then(user => {
    if (user) {
      res.status(422).send('Username taken. Please enter a new username.')
    }
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    return newUser.save();
  })
  .then(() => {
    const newJWT = jwt.sign({username: req.body.username}, helpers.jwtOptions.secretOrKey);
    res.status(201).send({message: 'Thank you for signing up!', token: newJWT})
  }).catch(err => res.status(500).send('Server err: ', err));
});

app.post('/api/formdata', (req, res) => {
  const entry = new Entry({
    userId: req.user._id,
    datetime: req.body.datetime,
    type: req.body.type,
    ingredients: req.body.ingredients,
    sleepDuration: req.body.sleepDuration,
    sleepQuality: req.body.sleepQuality,
    exerciseDuration: req.body.exerciseDuration,
    exerciseIntensity: req.body.exerciseIntensity,
    waterAmount: req.body.waterAmount,
    physicalScore: req.body.physicalScore,
    emotionalScore: req.body.emotionalScore,
    physicalTags: req.body.physicalTags,
    emotionalTags: req.body.emotionalTags
  });
  return entry.save(post)
  .then(() => res.status(201).send('Entry created'))
  .catch(err => res.status(500).send('Server error', err))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

module.exports = app;
