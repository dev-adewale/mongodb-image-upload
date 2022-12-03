/* Import mongoose */
import mongoose from 'mongoose';

/* Import gridfs-stream */
import grid from 'gridfs-stream'

/* .env configuration*/
import * as env from 'dotenv'
env.config()

const db = mongoose.createConnection(process.env.MONGO_URI)

db.once('open', () => {
    const gfs = grid(db.db, mongoose.mongo)
    gfs.collection('uploads')
    console.log('Connected to DB!');
})

export default db