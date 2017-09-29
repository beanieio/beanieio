var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test')


var entrySchema = new Schema({
  userid: Schema.Types.Objectid,
  datetime: Date,
  type: String,
  ingredients: [String],
  sleepDuration: Number,
  sleepQuality: Number,
  exerciseDuration: Number,
  exerciseIntensity: Number,
  waterAmount: Number
  physicalScore: Number,
  emotionalScore: Number,
  physicalTag: [String],
  emotionalTag: [String]
})

