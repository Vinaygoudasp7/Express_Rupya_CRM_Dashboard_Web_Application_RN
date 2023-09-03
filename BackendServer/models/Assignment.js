import {  DataTypes } from "sequelize";
import { sequelize } from "../databasesequelize.js";
import lenders from "./lenders.js";
import borrowers from "./borrower.js";
import teammembers from "./teammembers.js";


const Assignments = sequelize.define('assignments',{
    Assignment_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       
    },
    team_member_name:{
        type:DataTypes.STRING,
    }
})

lenders.hasOne(Assignments,{foreignKey:'lender_id'});
borrowers.hasOne(Assignments,{foreignKey:'borrower_id'});
teammembers.hasOne(Assignments,{foreignKey:'teammember_id'});

Assignments.belongsTo(lenders,{foreignKey:'lender_id'});
Assignments.belongsTo(borrowers,{foreignKey:'borrower_id'});
Assignments.belongsTo(teammembers,{foreignKey:'teammember_id'});

export default Assignments;