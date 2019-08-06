module.exports = {
  // the 'up' method bellow will create a new column into the database.
  up: (queryInterface, Sequelize) => {
    /**
     * Here, the 'users' database will have a new column called 'avatar_id'. This new field
     * will get info from the 'files' table 'id' column.
     */
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      // If the field is updated, it'll also update the database through the 'CASCADE
      onUpdate: 'CASCADE',
      // If the field id deleted, the info on database will be set as 'NULL'
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  // Mehod to delete the column from the database
  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
