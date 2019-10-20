const Sequelize = require('sequelize');
import { Database } from '../../db';
import { User } from './user.model';
import { Competency } from '../competency/competency.model';

const UserCompetency = Database.define('user_competency', {
    activeComponentId: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.INTEGER
    },
    state: {
        allowNull: false,
        type: Sequelize.ENUM('completed', 'active', 'in_progress'),
        defaultValue: 'active',
        validate: {
            isIn: {
                args: [['completed', 'active', 'in_progress']],
                msg: 'Invalid state.'
            }
        }
    },
    data: { // e.g., progress data json
        type: Sequelize.JSON
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