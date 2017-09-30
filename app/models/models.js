const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://127.0.0.1:27017/healthme');

//TODO: establish user config defaults
const userSchema = new Schema(
  {
    username: {type: String, unique: true},
    password: String,
    logins: Number,
    submissions: Number,
    email: String,
    ingredients: [String],
    goals: Schema.Types.Mixed,
    physical: [String],
    emotional: [String]
  },
  {timestamps: true}
);

userSchema.pre('save', function(next) {
  // TODO: setup the default user config
  return bcrypt.hash(this.password, 10).then(hash => {
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(pwd) {
  return bcrypt.compare(pwd, this.password);
};

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
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.Entry = mongoose.model('Entry', entrySchema);
module.exports.mongoose = mongoose;
