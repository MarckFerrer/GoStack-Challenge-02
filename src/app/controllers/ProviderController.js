// The 'User' import will info from users, like if they're a provider or not
import User from '../models/User';
// .
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    // Here all registers will be select from database
    const providers = await User.findAll({
      where: { provider: true },
      // The select fields will be passed to the 'attributes' const
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
