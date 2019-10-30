const Sequelize = require('sequelize');
import { Database } from '../../db';
import { User } from './user.model';
import { Competency } from '../competency/competency.model';
import { Campaign } from '../campaign/campaign.model';

const UserCompetency = Database.define('user_competency', {
    score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0 // 0 - Not Attempted ; 1 - Completed ; 2 - In Progress
    },
    strikeable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'user_competencies'
});

User.belongsToMany(Competency, { through: UserCompetency });
Competency.belongsToMany(User, { through: UserCompetency });

// UserCompetency.sync();

export { UserCompetency };