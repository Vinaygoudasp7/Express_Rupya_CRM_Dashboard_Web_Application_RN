'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../databasesequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('borrowers', 'teammember_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'teammembers',
        key: 'TeamM_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

  
    await queryInterface.addColumn('lenders', 'teammember_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'teammembers',
        key: 'TeamM_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('borrowers', 'Teammember_id');
    
    await queryInterface.removeColumn('lenders', 'Teammember_id');
    
  }
};
