const Sequelize = require('sequelize');
import { Database } from '../../db';
import { User } from './user.model';
import { Competency } from '../competency/competency.model';

const UserCompetency = Database.define('user_competency', {
    activeComponentId: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0 // 0 - Not Attempted ; 1 - Completed ; 2 - In Progress
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