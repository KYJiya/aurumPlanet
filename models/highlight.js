const { Sequelize } = require("sequelize");

module.exports = class Highlight extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            highlightId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            text: {
                type: Sequelize.STRING(100),
                allowNull: true,
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
            modelName: 'Highlight',
            tableName: 'highlights',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Highlight.belongsTo(db.Theme, { foreignKey: 'themeId', targetKey: 'themeId' });
        db.Highlight.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
        db.Highlight.belongsTo(db.Page, { foreignKey: 'pageId', targetKey: 'pageId' });
    }
};