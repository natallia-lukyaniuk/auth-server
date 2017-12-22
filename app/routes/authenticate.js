var jwt    = require('jsonwebtoken');
var User   = require('../models/user');

module.exports = function (apiRoutes, app) {
  apiRoutes.post('/authenticate', function(req, res) {
    User.findOne({
      login: req.body.login
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          const payload = {
              admin: user.admin
          };
          var token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn: 1440
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  });
}
