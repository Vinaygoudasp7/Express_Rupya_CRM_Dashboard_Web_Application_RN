import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../databasesequelize.js";
import borrowers from "./borrower.js";
import lenders from "./lenders.js";

const LenderClassified = sequelize.define('LenderClassification', {
    classification_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    borrower_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    classification: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

LenderClassified.belongsTo(borrowers, { foreignKey: 'borrower_id' })
LenderClassified.belongsTo(lenders, { foreignKey: 'lender_id' })

export default LenderClassified;