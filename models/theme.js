const { Sequelize } = require("sequelize");

module.exports = class Theme extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            themeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            color1: {
                type: Sequelize.STRING(7),
                allowNull: false,
            },
            color2: {
                type: Sequelize.STRING(7),
                allowNull: false,
            },
            color3: {
                type: Sequelize.STRING(7),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Theme',
            tableName: 'themes',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Theme.hasMany(db.Highlight, { foreignKey: 'themeId', sourceKey: 'themeId' });
    }
};