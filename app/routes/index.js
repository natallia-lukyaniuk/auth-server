var projectsRoutes = require('./projects')
var usersRoutes = require('./users');

module.exports = function(apiRoutes, app) {
  projectsRoutes(apiRoutes, app);
  usersRoutes(apiRoutes, app);
}