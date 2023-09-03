import { DataTypes } from "sequelize";
import { sequelize } from "../databasesequelize.js";
import Approval_table from "./Aproval.js";
import lenders from "./lenders.js";
import borrowers from "./borrower.js";
import teammembers from "./teammembers.js";


const Status_updates = sequelize.define('Status_update', {
    St_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "Approval_tables",
            key: "Approval_id"
        }
    },
    Date_of_Creation: {
        type: DataTypes.DATEONLY,
    },
    lastupdate: {
        type: DataTypes.DATEONLY,
    },
    borrower_name: {
        type: DataTypes.STRING,
    },

    lender_name: {
        type: DataTypes.STRING
    },

    action_Taken: {
        type: DataTypes.STRING
    },
    Pending_with: {
        type: DataTypes.STRING
    },
    Praposal_status: {
        type: DataTypes.STRING
    },
    Comment: {
        type: DataTypes.TEXT
    },
    updated_by: {
        type: DataTypes.STRING
    },
    lender_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "lenders",
            key: "id"
        }
    },
    borrower_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "borrowers",
            key: "id"
        }
    },
    teammember_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "teammembers",
            key: "TeamM_id",
        }
    },
    Next_followup_Date: {
        type: DataTypes.DATEONLY
    }

})

Status_updates.belongsTo(lenders, { foreignKey: "lender_id" });
Status_updates.belongsTo(borrowers, { foreignKey: "borrower_id" });
Status_updates.belongsTo(teammembers, { foreignKey: "teammember_id" });

lenders.hasOne(Status_updates, { foreignKey: "lender_id" });
borrowers.hasOne(Status_updates, { foreignKey: "borrower_id" });
teammembers.hasOne(Status_updates, { foreignKey: "teammember_id" });

export default Status_updates;