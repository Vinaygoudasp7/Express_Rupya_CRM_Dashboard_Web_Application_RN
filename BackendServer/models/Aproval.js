import { DataTypes, } from "sequelize";
import { sequelize } from "../databasesequelize.js";
import lenders from "./lenders.js";
import borrowers from "./borrower.js";
import teammembers from "./teammembers.js";


const Approval_table = sequelize.define("Approval_tables", {

    Approval_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    borrower_name: {
        type: DataTypes.STRING,
    },
    lender_name: {
        type: DataTypes.STRING
    },
    lender_approval: {
        type: DataTypes.STRING
    },
    updated_by: {
        type: DataTypes.STRING
    },
    lender_id: {
        type: DataTypes.INTEGER,
    },
    borrower_id: {
        type: DataTypes.INTEGER
    },
    lastupdate: {
        type: DataTypes.DATEONLY
    },
    Date_of_creation: {
        type: DataTypes.DATEONLY
    }
})

lenders.hasOne(Approval_table, { foreignKey: 'lender_id' });
borrowers.hasOne(Approval_table, { foreignKey: 'borrower_id' });
teammembers.hasOne(Approval_table, { foreignKey: 'teammember_id' });

Approval_table.belongsTo(lenders, { foreignKey: 'lender_id' });
Approval_table.belongsTo(borrowers, { foreignKey: 'borrower_id' });
Approval_table.belongsTo(teammembers, { foreignKey: 'teammember_id' });



export default Approval_table