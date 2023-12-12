// models/blacklisttoken.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BlacklistToken extends Model {
        static associate(models) {
            // associations can be defined here
        }
    }
    BlacklistToken.init(
        {
            token: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'BlacklistToken',
            tableName: 'BlacklistTokens',
        }
    );
    return BlacklistToken;
};
