/* Import express */
import express from 'express'

/* Import mongoose */
import mongoose from 'mongoose'

/* Init express router */
const Router = express.Router()

/* Import storage */
import upload from '../storage/storage.js'

/* Import DB */
import db from '../connection/db.js'

/* Import gridfs-stream */
import grid from 'gridfs-stream'

/* Render ejs homepage */
Router.get('/', (req, res) => res.render('index'))

/* Set up POST route */
Router.post('/upload', upload.single('mdimg'), (req, res) => {
    if (res.status(200)) {
        res.render('index', {
            alert: "Image Uploaded 🎉!"
        })
    } else {
        res.render('index', {
            alert: "An error occured, please try again 📛!"
        })
    }
})

/* Get all database files */
Router.get('/files', (req, res) => {
    const gfs = grid(db.db, mongoose.mongo)
    gfs.collection('uploads')

    gfs.files.find().toArray((err, files) => {

        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No file response!'
            })
        }

        return res.json(files)
    })
})

/* Get database file by filename */
Router.get('/files/:filename', (req, res) => {
    const gfs = grid(db.db, mongoose.mongo)
    gfs.collection('uploads')

    gfs.files.findOne({ filename: req.params.filename }, (err, files) => {

        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No file response!'
            })
        }

        return res.json(files)
    })
})

export default Router