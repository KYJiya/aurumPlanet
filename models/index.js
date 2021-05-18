const Sequelize = require('sequelize');
const Theme = require('./theme');
const Highlight = require('./highlight');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Theme = Theme;
db.Highlight = Highlight;

Theme.init(sequelize);
Highlight.init(sequelize);

Theme.associate(db);
Highlight.associate(db);

module.exports = db;
