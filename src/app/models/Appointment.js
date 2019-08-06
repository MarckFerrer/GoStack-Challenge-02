// Both 'Sequelize' and one of its classes 'Model' are imported to perfome the data verification
import Sequelize, { Model } from 'sequelize';
// The 'User' class is used to create a new user
class Appointment extends Model {
  /**
   *  The 'init' method is used to create a pattern for the upcoming data and to define
   *  what type will it be
   */
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // Create aliases for the upcoming fields of the database
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
