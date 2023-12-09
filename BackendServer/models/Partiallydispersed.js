import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../databasesequelize.js";

const partiallyDisbersedTable = sequelize.define('partiallyDisbersedTable', {
    borrower_id: {
        type: DataTypes.INTEGER
    },
    borrower_name: {
        type: DataTypes.STRING(255)
    },
    lender_name: {
        type: DataTypes.STRING(255)
    },
    lender_id: {
        type: DataTypes.INTEGER
    },
    sanction_date: {
        type: DataTypes.DATEONLY
    },
    type_of_sanction: {
        type: DataTypes.STRING(255)
    },
    sanctioned: {
        type: DataTypes.DOUBLE
    },

    disbuersed_date: {
        type: DataTypes.DATEONLY
    },
    disbursed_amt: {
        type: DataTypes.DOUBLE
    },
    balance_disbursed_amt: {
        type: DataTypes.DOUBLE
    },
    nextfollowupdate: {
        type: DataTypes.DATEONLY
    },
    isDisbursed: {
        type: DataTypes.TINYINT
    }
})

export default partiallyDisbersedTable