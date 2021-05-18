const Sequelize = require('sequelize');
const Theme = require('./theme');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Theme = Theme;

Theme.init(sequelize);

Theme.associate(db);

module.exports = db;
