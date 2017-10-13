const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // overriding mongoose's promise library with global promises
const bcrypt = require('bcrypt');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/healthme');

const ingredientsDefaults = [
  'nuts', 'wheat', 'gluten', 'dairy', 'egg',
  'soy', 'fish', 'red meat', 'poultry', 'fruits',
  'leafy vegetables', 'peppers', 'sugar', 'sweetener',
  'greasy', 'fried', 'oil', 'liquor', 'beer', 'wine'
];

const emoDefaults = [
  'Fine', 'Energized', 'Relaxed',
  'Unmotivated', 'Stressed', 'Drained', 'Depressed'
];

const physDefaults = [
  'Great', 'Okay', 'Tired', 'Sore', 'Cramps',
  'Sick', 'Headache', 'Bloated', 'Nauseous'
];


const userSchema = new Schema(
  {
    username: {type: String, unique: true},
    password: String, // hashed password (bcrypt)
    logins: Number, // TODO: track number of logins here
    submissions: Number, // TODO: track submissions here
    email: String,
    ingredients: [String], // available ingredients for meal form
    goals: Schema.Types.Mixed, // TODO: goal system
    physical: [String], // available options for pulse form physical
    emotional: [String] // available options for pulse form emotional
  },
  {timestamps: true}
);

userSchema.pre('save', function(next) {
  this.ingredients = ingredientsDefaults;
  this.emotional = emoDefaults;
  this.physical = physDefaults;
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
