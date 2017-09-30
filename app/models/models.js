const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/healthme')


const userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  logins: Number,
  submissions: Number,
  email: String,  // TODO: Find a way to ensure emails are unique IFF provided
  ingredients: [String],
  goals: Schema.Types.Mixed,
  physical: [String],
  emotional: [String]
})

module.exports.User = mongoose.model('User', userSchema);

const entrySchema = new Schema({
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