var projectsRoutes = require('./projects')
var usersRoutes = require('./users');
var tasksRoutes = require('./tasks');
var projectUserRoutes = require('./projectUser');

module.exports = function(apiRoutes, app) {
  projectsRoutes(apiRoutes, app);
  usersRoutes(apiRoutes, app);
  projectUserRoutes(apiRoutes, app);
  tasksRoutes(apiRoutes, app);
}