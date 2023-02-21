const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const notFound = require('./Middlewares/notFound')
const handleError = require('./Middlewares/handleError')
const routerApi = require('./Controllers/index')
require('dotenv').config()
require('./db')

// variables environment
const { PORT } = process.env

// middlewares
// todo config corse with ip or page app frontend
app.use(cors({ origin: "*" }))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//send app  to routes
routerApi(app)

//middlewares error and not found
app.use(notFound)
app.use(handleError)

app.listen(PORT, () => {
    console.log("listening on port " + PORT)
})

