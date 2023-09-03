import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../databasesequelize.js";

const BorrowerContactDetails = sequelize.define('BorrowercontactDetailes', {
    C_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mailType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

export default BorrowerContactDetails;