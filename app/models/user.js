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
  goals: Schema.types.Mixed
  physical: [String],
  emotional: [String]
})

userSchema.pre('test', function(){

})