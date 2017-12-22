var jwt    = require('jsonwebtoken');
var Projects   = require('../models/projects');

module.exports = function (apiRoutes, app) {
  apiRoutes.get('/projects', function(req, res) {
    Projects.find({}, function(err, projects) {
      res.json(projects);
    });
  });
}