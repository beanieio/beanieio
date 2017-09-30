// For testing Entry and User Schema(s) in DB


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
var testUser = new User();

testUser.username = 'Phillip';
testUser.password = 'sd98f7s987d$!#%@';
testUser.logins = 3;
testUser.submissions = 4;
testUser.email = 'example@gmail.com';
testUser.ingredients = ['grease', 'cheese'];
// testUser.goals = {emotional: 'happiness', physical: ['pushups', 'running']} -- > TODO
testUser.physical = ['sore', 'tired', 'sick'];
testUser.emotional = ['despressed', 'bored'];

testUser.save()

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
var newEntry = new Entry();


newEntry.datetime = new Date;
newEntry.ingredients= ['wheat', 'lactose'];
newEntry.sleepDuration = 6;
newEntry.sleepQuality = 4;
newEntry.exerciseDuration = 20;
newEntry.exerciseIntensity = 4;
newEntry.waterAmount = 62;
newEntry.physicalScore = 3;
newEntry.emotionalScore = 4;
newEntry.physicalTags = ['great', 'awsome'];
newEntry.emotionalTags = ['happy', 'sad'];

newEntry.save()