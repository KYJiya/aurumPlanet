const { Sequelize } = require("sequelize")

module.exports = class Highlight extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userId: {
                type: Sequelize.STRING(16),
                allowNull: false,
            },
            pageUrl: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            colorHex: {
                type: Sequelize.STRING(7),
                allowNull: false,
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
    static associate(db) {}
}