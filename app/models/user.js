var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('users', new Schema({
  login: String,
  password: String,
  admin: Boolean,
  firstName: String,
  lastName: String,
  avatar: String,
  title: String
}));