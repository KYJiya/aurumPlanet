const Sequelize = require('sequelize');
const Theme = require('./theme');
const User = require('./user');
const Page = require('./page');
const Highlight = require('./highlight');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Theme = Theme;
db.User = User;
db.Page = Page;
db.Highlight = Highlight;

Theme.init(sequelize);
User.init(sequelize);
Page.init(sequelize);
Highlight.init(sequelize);

Theme.associate(db);
User.associate(db);
Page.associate(db);
Highlight.associate(db);

module.exports = db;
