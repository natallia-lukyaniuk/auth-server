var jwt = require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID;
var async = require('async');
var Users = require('../models/user');
var Tasks = require('../models/tasks');
var ProjectUser = require('../models/project-user');

module.exports = function (apiRoutes, app) {
    apiRoutes.get('/projects/:id/members', getMembersByProjectId);
    apiRoutes.delete('/projects/:id/delete', deleteMemberFromProject);
    apiRoutes.post('/projects/:id/add', addMemberToProject);
}

const getMembersByProjectId = (req, res) => {
  const id = req.params.id;
  const memberDetails = { 'projectId': id };
  const users = [];
  ProjectUser.find(memberDetails, (err, items) => {
    async.map(items, (item, next) => {
      const memberId = { '_id': new ObjectID(item.userId) };
      Users.findOne(memberId, (err, user) => {
        next(err, user);
      });
    },
    (err, users) => {
      res.send(users);
    });
  });
}

const deleteMemberFromProject = (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  const project_user = {
    projectId: req.params.id,
    userId: req.query.memberId
  };
  ProjectUser.remove(project_user, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send('project ' + id + ' deleted!');
    }
  });
}

const addMemberToProject = (req, res) => {
  const project_user = {
    projectId: req.params.id,
    userId: req.query.memberId
  };
  ProjectUser.create(project_user, (err, result) => {
    if (err) { 
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.send(result);
    }
  });
}