var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test')


var userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  logins: Number,
  submissions: Number,
  email: String,
  ingredients: [String],
  goals: Schema.Types.Mixed,
  physical: [String],
  emotional: [String]
})

module.exports.User = mongoose.model('User', userSchema);

var entrySchema = new Schema({
  userId: Schema.Types.ObjectId,
  datetime: Date,
  type: String,
  ingredients: [String],
  sleepDuration: Number,
  sleepQuality: Number,
  exerciseDuration: Number,
  exerciseIntensity: Number,
  waterAmount: Number,
  physicalScore: Number,
  emotionalScore: Number,
  physicalTags: [String],
  emotionalTags: [String]
})

module.exports.Entry = mongoose.model('Entry', entrySchema)