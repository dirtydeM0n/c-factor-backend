const Sequelize = require('sequelize');
import { Database } from '../../db';
import { User } from '../user/user.model';
import { Competency } from '../competency/competency.model';

const UserCompetency = Database.define('user_competency', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    }
}, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'user_competencies'
});

UserCompetency.belongsTo(User);
UserCompetency.belongsTo(Competency);

UserCompetency.sync();

export { UserCompetency };