var jwt = require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID;
var Users = require('../models/user');

module.exports = function (apiRoutes, app) {
  apiRoutes.get('/users', getUsers);
  apiRoutes.get('/users/:id', getUser);
  apiRoutes.delete('/users/:id', deleteUser);
  apiRoutes.post('/users', addUser);
  apiRoutes.put ('/users/:id', updateUser);
}

const getUsers = (req, res) => {
  Users.find({}, function(err, users) {
    res.json(users);
  });
}

const getUser = (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  Users.findOne(details, (err, item) => {
      if (err) {
          res.send({'error': 'An error has occurred'});
      } else {
          res.send(item);
      }
  });
}

const deleteUser = (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  Users.remove(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send('user ' + id + ' deleted!');
    } 
  });
}

const addUser = (req, res) => {
  const user = {
    login: req.body.login,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    avatar: req.body.avatar,
    title: req.body.title
  };
  Users.insert(user, (err, result) => {
    if (err) { 
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.send(result.ops[0]);
    }
  });
}

const updateUser = (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const user = {
      login: req.body.login,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      avatar: req.body.avatar,
      title: req.body.title
    };
    Users.update(details, user, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(user);
      } 
    });
}