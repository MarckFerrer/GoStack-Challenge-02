// Importing 'multer' to deal with image upload
import multer from 'multer';
// Importing 'crypto' to deal with image name incription
import crypto from 'crypto';
// Importing the 'extname' to deal with file names and 'resolve' to solve any problems the path may have
import { extname, resolve } from 'path';

export default {
  // This is how multer will save the files. 'diskStorage' means it'll be stored inside the machine
  storage: multer.diskStorage({
    // The destination bellow will create the path to the 'uploads' folder inside the root
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // The 'filename' will collect the info provided by the user then will rename it
    filename: (req, file, cb) => {
      // The 'crypto' method will add 16 random bytes to the 'res'.
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        // The bytes will be converted to hexadecimal and then it'll rename the file
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
