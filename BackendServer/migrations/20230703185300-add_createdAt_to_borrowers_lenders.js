'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('borrowers','createdAt',{
      type:Sequelize.DATE,
      allowNull:false,
    });

    await queryInterface.addColumn('lenders','createdAt',{
      type:Sequelize.DATE,
      allowNull:false,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('borrowers','createdAt');
    await queryInterface.removeColumn('lenders','createdAt')
   
  }
};
