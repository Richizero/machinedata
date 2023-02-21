const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const turns = {
    'turn': Number,
    'position_slowPoint1': Number,
    'position_intermediatePoint2': Number,
    'position_point3': Number,
    'position_point4': Number,
    'position_fast': Number,
    'position_decel': Number,
    'position_intensifierPos': Number,
    'valveSet_slowValve1': Number,
    'valveSet_intermediateValve2': Number,
    'valveSet_valve3': Number,
    'valveSet_valve4': Number,
    'valveSet_fast': Number,
    'valveSet_decel': Number,
    'valveSet_intensSpeed': Number,
    'outputsShot_fullyFwd': Number,
    'outputsShot_vaccumStart': Number,
    'velocity_slow': Number,
    'velocity_intermediate': Number,
    'velocity_fast': Number,
    'velocity_gateVel': Number,
    'pressure_shotPressure': Number,
    'pressure_decelPressure': Number,
    'pressure_intensifierPressure': Number,
    'pressure_finalPressure': Number,
    'pressure_closingPressure': Number,
    'time_cycleTime': Number,
    'time_dwellTime': Number,
    'time_riseTime': Number,
    'others_okForDwell': Number,
    'others_biscuitLength': Number,
    'others_diameterTip': Number,
    'others_lubeRatioAndType': Number,
    'others_coverHalfTemp': Number,
    'others_ejectorHalfTemp': Number,
    'others_plungerFlow': Number,
    'others_powderQuantity': Number,
    'others_oilQuantity': Number,
    'furnace_metalTemp': Number,
    'furnace_dosingVol': Number,
    'furnace_timeLag': Number,
    'hotOilUnit_oilFlow': Number,
    'hotOilUnit_coverHalf': Number,
    'hotOilUnit_ejectorHalfTemp': Number,
    'vacuum_channelA': Number,
    'vacuum_channelB': Number,
    'jetCooling_dischargePressure': Number,
    'jetCooling_time': Number
}
const fechasSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now},
    turnos: [turns],
    idMachine: [{
        type: Schema.Types.ObjectId,
        ref: 'Machine'
    }]
})

fechasSchema.set('toJSON', (
    {
        transform: (document, returnObjecto) => {
            returnObjecto.id = returnObjecto._id
            delete returnObjecto._id
            delete returnObjecto.__v
        }
    }
))

const Fecha = model('Fecha', fechasSchema)
module.exports = Fecha