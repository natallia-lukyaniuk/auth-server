var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('project_user', new Schema({
  userId: String,
  projectId: String,
}));