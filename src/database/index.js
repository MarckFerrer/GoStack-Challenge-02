/**
 *  The 'Sequelize' import bellow allows the migration of databaase, so the CRUD can be done
 *  with javascript, instead of sql.
 */
import Sequelize from 'sequelize';
// The 'User' import will be used to check passwords and create new users
import User from '../app/models/User';
// The 'databaseConfig' contains info like host and database name, allowing the connection
import databaseConfig from '../config/database';

// The const bellow will store the fields of the database
const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // A connection with the DB is stablished based on the info of 'databaseConfig' file
    this.connection = new Sequelize(databaseConfig);
    /**
     *  The 'models' array will receive all the info of the database through the init method
     *  that is inside the 'User' class
     */
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
