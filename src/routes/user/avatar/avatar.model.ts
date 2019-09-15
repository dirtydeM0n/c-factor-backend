
const Sequelize = require('sequelize');
import { Database } from '../../../db';
import { User } from './../user.model';

const Avatar = Database.define('avatar', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    gender: {
        type: Sequelize.STRING
    },
    width: {
        type: Sequelize.STRING
    },
    height: {
        type: Sequelize.STRING
    },
    color: {
        type: Sequelize.TEXT
    }
}, {
    /*indexes: [{ unique: true, fields: ['profile_id'] }],*/
    timestamps: true,
    freezeTableName: true,
    tableName: 'avatar'
});

Avatar.belongsTo(User);

Avatar.sync();

export { Avatar };