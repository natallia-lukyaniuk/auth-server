var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('tasks', new Schema({
  title: String,
  startDate: String,
  endDate: String,
  userId: String,
  projectId: String,
  type: String,
  number: String,
  descripton: String,
  status: String
}));