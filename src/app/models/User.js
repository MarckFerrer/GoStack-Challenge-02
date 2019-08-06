// The 'bcrypt' is used to encrypt the password typed by the user
import bcrypt from 'bcryptjs';
// Both 'Sequelize' and one of its classes 'Model' are imported to perfome the data verification
import Sequelize, { Model } from 'sequelize';
// The 'User' class is used to create a new user
class User extends Model {
  /**
   *  The 'init' method is used to create a pattern for the upcoming data and to define
   *  what type will it be
   */
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    /**
     *  The 'addHook' bellow is used to check if, when creating a new user a password
     *  was informed. If so, it'll be incrypted with strenght 8
     */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // eslint-disable-next-line no-param-reassign
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  // The method bellow will associate the 'avatar_id" on the 'user' table to the 'files' table.
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  // The method bellow wil check if a password informed is valid
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
