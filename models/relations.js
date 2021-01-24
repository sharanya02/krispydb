const user = require('./user');
const server = require('./server');
const task = require('./task');
const sequelize = require('sequelize');
const db = require('../database/connection');

 const user_tasks = db.define('user_tasks', {
    role: sequelize.STRING
  });

user.belongsToMany(task, { through: user_tasks });
task.belongsToMany(user, { through: user_tasks });
user.hasMany(server,{foreignKey: 'UserID'});
