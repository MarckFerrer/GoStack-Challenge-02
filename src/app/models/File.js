// Both 'Sequelize' and one of its classes 'Model' are imported to perfome the data verification
import Sequelize, { Model } from 'sequelize';
// The 'User' class is used to create a new user
class File extends Model {
  /**
   *  The 'init' method is used to create a pattern for the upcoming data and to define
   *  what type will it be
   */
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default File;
