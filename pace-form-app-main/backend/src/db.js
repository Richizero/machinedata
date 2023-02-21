const mongoose = require('mongoose')
require('dotenv').config()
const { DB_DEV, ENVIRONMENT, DB_PROD } = process.env

const db = ENVIRONMENT === 'dev' ? DB_DEV : DB_PROD
console.log(`Database: ${db}`)
console.log(`Database: ${DB_DEV}`)
console.log(`Mode: ${ENVIRONMENT}`)

mongoose.set('strictQuery', false)
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`connection with ${mongoose.connection.name} database`)
}).catch(e => {
    console.error(e)
})

exports.connection = mongoose.connection

