import { DataTypes } from "sequelize";
import { sequelize } from "../databasesequelize.js";


const teammembers = sequelize.define('teammembers', {
    TeamM_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }

});

export default teammembers;