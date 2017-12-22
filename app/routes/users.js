var jwt    = require('jsonwebtoken');
var User   = require('../models/user');

module.exports = function (apiRoutes, app) {
  apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });
}