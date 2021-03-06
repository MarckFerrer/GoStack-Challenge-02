// The 'Yup' module is imported to check if the data presented by the user fits the expectations
import * as Yup from 'yup';
// The 'User' class is being imported to create and edit users.
import User from '../models/User';

class UserController {
  // the 'store' method will save users to the database
  async store(req, res) {
    // The 'schema' varible is used as a standard to what the data will have to look like
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .required()
        .min(6),
    });

    // The conditional bellow will check is all the data presented meets the requirements
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    // The 'userExists' check if the email informed already exists, returning a boolean value
    const userExists = await User.findOne({ where: { email: req.body.email } });

    // If the user indeed exists, it'll return an error message
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // After all the verification is done, the user can finally be created
    const { id, name, email, provider } = await User.create(req.body);
    // The info inserted on the database is shown
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  // The 'update' method will update some of the user's information
  async update(req, res) {
    // The 'schema' varible is used as a standard to what the data will have to look like
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string()
        .required()
        .min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      // Checks if the 'confirmPassword' matches the new informed password.
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    // The conditional bellow will check is all the data presented meets the requirements
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);
    /**
     *  Check if the user is trying to update their account with an email address
     *  that is already in use.
     */
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }
    // Check if the password is correct
    if (oldPassword && (await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name, provider } = await user.update(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}
export default new UserController();
