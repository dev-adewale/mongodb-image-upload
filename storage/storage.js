/* Import crypto */
import crypto from 'crypto'

/* Import path */
import path from 'path';

/* Import GridFsStorage */
import { GridFsStorage } from 'multer-gridfs-storage'

/* Import multer */
import multer from 'multer';

/* .env configuration*/
import * as env from 'dotenv'
env.config()

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

export default upload