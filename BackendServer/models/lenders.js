import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../databasesequelize.js";


//lender model properties
const lenders = sequelize.define('lenders', {
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
        unique: true
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
    aum: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
    },
    minCreditRating: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    minInterestRate: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
    },
    minLoanAmount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
    },
    maxLoanAmount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
    },
    Borrowerregion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lendercomment: {
        type: DataTypes.STRING,
        allowNull: false
    }, isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
});

export default lenders;