// 'Yup' is imported to deal with imput schemas.
import * as Yup from 'yup';
// The 'User' class is imported to deal with user queries queries and other operations
import User from '../models/User';
// The 'Appointment' class is imported to manage the appointment rulues
import Appointment from '../models/Appointment';

/**
 * The 'AppointmentController' class will create new appointments and check if they're
 * happening between a service provider and a non service provider
 */

class AppointmentController {
  async store(req, res) {
    // The 'schema' will validade the info provided before a new appointment
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    // If the data isn't valid, the validation will fail
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed ' });
    }
    const { provider_id, date } = req.body;
    /**
     * Check if 'provider_id' is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    // The validation will fail if the provided status e false
    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointment with providers' });
    }
    // Creates a new appointment into database if all the info is correct
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });
    return res.json(appointment);
  }
}
export default new AppointmentController();
