const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { User, Entry } = require('./models/models.js')
const debug = process.env.DEBUG || false;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/entries', (req, res) => {
  Entry.find()
  .then(function(entry) {
    res.status(200).json(entry)
  })
  // curl --request GET 'localhost:3000/api/formdata'
})

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
// curl -H "Content-Type: application/json" -X POST -d '{"userId": "test","ingredients": ["wheat", "lactose"],"sleepDuration": 6,"sleepQuality": 4,"exerciseDuration": 20,"exerciseIntensity": 4,"waterAmount": 62,"physicalScore": 3,"emotionalScore": 4,"physicalTags": ["great", "awsome"],"emotionalTags": ["happy", "sad"]}' http://localhost:3000/api/formdata
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

module.exports = app;
