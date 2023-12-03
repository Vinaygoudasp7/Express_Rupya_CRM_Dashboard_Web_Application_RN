import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../databasesequelize.js";
import teammembers from "./teammembers.js";


const borrowers = sequelize.define('borrowers', {
    //borowers model properties
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false

    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    ,
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    ,
    entityType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cin: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true

    },
    loanTypes: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    ,

    owner: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    productType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    products: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    creditRating: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    creditRatingAgency: {
        type: DataTypes.STRING,
        allowNull: true
    },
    aum: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
    },
    maxInterestRate: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
    },
    minLoanAmount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
    },
    mfiGrading: {
        type: DataTypes.STRING,

    },
    quarterAUM: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    financialYearAUM: {
        type: DataTypes.STRING,
        allowNull: true,
    },

});

export default borrowers;