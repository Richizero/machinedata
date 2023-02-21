const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const machineSchema = new mongoose.Schema({
    'nameMachine': String,
    'nPart': Number,
    'nModel': Number,
    idFechas: [{
            type: Schema.Types.ObjectId,
            ref: 'Fechas'
        }]
}, { timestamps: true })

machineSchema.set('toJSON', (
    {
        transform: (document, returnObjecto) => {
            returnObjecto.id = returnObjecto._id
            delete returnObjecto._id
            delete returnObjecto.__v
        }
    }
))

const Machine = model('Machine', machineSchema)
module.exports = Machine