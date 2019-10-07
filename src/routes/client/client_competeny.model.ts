const Sequelize = require('sequelize');
import { Database } from '../../db';
import { Competency } from '../competency/competency.model';
import { Client } from './client.model';

const ClientCompetency = Database.define('client_competency', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    }
}, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'client_competencies'
});

Client.belongsToMany(Competency, { through: ClientCompetency });
Competency.belongsToMany(Client, { through: ClientCompetency });

ClientCompetency.sync();

export { ClientCompetency };