var jwt    = require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID;
var Projects   = require('../models/projects');
var Tasks   = require('../models/tasks');

module.exports = function (apiRoutes, app) {
  apiRoutes.get('/projects', getProjects);
  apiRoutes.get('/projects/:id', getProject);
  apiRoutes.delete('/projects/:id', deleteProject);
  apiRoutes.post('/projects', addProject);
  apiRoutes.put ('/projects/:id', updateProject);
}

const getProjects = (req, res) => {
  Projects.find({}, function(err, projects) {
    res.json(projects);
  });
}

const getProject = (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    Projects.findOne(details, (err, item) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
          const taskDetails = { 'projectId': id };
          Tasks.find(taskDetails, (err, items) => {
            const project = Object.assign({}, item, {tasks: items});
            res.send(project);
          });
        }
    });
}

const deleteProject = (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  Projects.remove(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send('project ' + id + ' deleted!');
    }
  });
}

const addProject = (req, res) => {
  const project = {
    title: req.body.title,
    avatar: req.body.avatar,
    description: req.body.description
  };
  Projects.insert(project, (err, result) => {
    if (err) {
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.send(result.ops[0]);
    }
  });
}

const updateProject = (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  const project = {
      title: req.body.title,
      avatar: req.body.avatar,
      description: req.body.description
  };
  Projects.update(details, project, (err, result) => {
    if (err) {
        res.send({'error':'An error has occurred'});
    } else {
        res.send(project);
    } 
  });
}