/* Import express */
import express from 'express'

/* Import ejs */
import ejs from 'ejs'

/* Init express instance */
const app = express()

/* Import router */
import router from './routes/router.js'

/* Import db */
import db from './connection/db.js'

/* Handle request to router.js */
app.use('/', router)

/* Set view engine */
app.set('view engine', 'ejs')

app.use(express.static('public'))

/* Port listener */
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))