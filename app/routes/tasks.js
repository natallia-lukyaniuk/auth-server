var jwt = require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID;
var Users = require('../models/user');
var Tasks = require('../models/tasks');

module.exports = function (apiRoutes, app) {
  apiRoutes.get('/tasks/:id', getTask);
  apiRoutes.get('/tasks', getTasks);
  apiRoutes.post('/tasks', addTask);
  apiRoutes.delete('/tasks/:id', deleteTask);
  apiRoutes.put ('/tasks/:id', updateTask);
}

const getTask = (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
 Tasks.findOne(details, (err, item) => {
    if (err) {
        res.send({'error': 'An error has occurred'});
    } else {
      const userDetails = { '_id': new ObjectID(item.userId) };
      Users.findOne(userDetails, (err, user) => {
        if (err) {
          res.send({'error': 'An error has occurred'});
        } else {
          const task = Object.assign({}, item, {user: user});
          res.send(task);
        }
      })
    }
  });
}

const getTasks = (req, res) => {
  Tasks.find({}, (err, items) => {
    res.send(items);
  });
}

const deleteTask = (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  Tasks.remove(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send('task ' + id + ' deleted!');
    } 
  });
}

const addTask = (req, res) => {
  const task = {
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: req.body.userId,
    projectId: req.body.projectId,
    type: req.body.type,
    number: req.body.number,
    description: req.body.description,
    status: req.body.status
  };
  Tasks.insert(task, (err, result) => {
    if (err) { 
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.send(result.ops[0]);
    }
  });
}

const updateTask = (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  const task = {
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: req.body.userId,
    projectId: req.body.projectId,
    type: req.body.type,
    number: req.body.number,
    description: req.body.description,
    status: req.body.status
  };
  Tasks.update(details, task, (err, result) => {
    if (err) {
        res.send({'error':'An error has occurred'});
    } else {
        res.send(task);
    }
  });
}