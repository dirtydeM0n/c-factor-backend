const Sequelize = require('sequelize');
import { Database } from '../../db';
import { User } from './user.model';
import { Competency } from '../competency/competency.model';

const UserCompetency = Database.define('user_competency', {
    state: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['completed', 'active', 'in_progress'],
        defaultValue: 'active',
        validate: {
            isIn: {
                args: [['completed', 'active', 'in_progress']],
                msg: 'Invalid state.'
            }
        }
    }
}, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'user_competencies'
});

User.belongsToMany(Competency, { through: UserCompetency });
Competency.belongsToMany(User, { through: UserCompetency });


UserCompetency.sync();

export { UserCompetency };