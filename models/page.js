const { Sequelize } = require("sequelize");

module.exports = class Page extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            pageId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            pageUrl: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Page',
            tableName: 'pages',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Page.belongsToMany(db.User, { through: 'UserPage' });
        db.Page.hasMany(db.Highlight, { foreignKey: 'pageId', sourceKey: 'pageId' });
    }
};