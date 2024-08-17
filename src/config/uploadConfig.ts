import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder: path.resolve(tmpPath),
  uploadFolder: path.resolve('uploads'),
  storage: multer.diskStorage({
    destination: tmpPath,
    filename(req, file, callback) {
      const fileHex = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHex + '-' + file.originalname}`

      return callback(null, fileName);
    },
  })
}
