// The import bellow will provide the pattern for the file upload
import File from '../models/File';
// The class bellow will store the image on the database.
class FileController {
  // The store method will insert the file's info into the database.
  async store(req, res) {
    // The const bellow will collect the file's name and path and will store it.
    const { originalname: name, filename: path } = req.file;
    // The data is then inserted into the database.
    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
