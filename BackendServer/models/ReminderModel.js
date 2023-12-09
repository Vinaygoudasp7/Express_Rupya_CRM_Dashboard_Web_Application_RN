import { DataTypes } from "sequelize";
import { sequelize } from "../databasesequelize.js";
import Status_updates from "../models/Status_updates.js";

const EmailReminder = sequelize.define('EmailReminder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    emailsent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    nextFollowUpdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    teamMember: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
})

EmailReminder.belongsTo(Status_updates, { foreignKey: { name: 'Status_id' } })

export default EmailReminder