const Machine = require('../Models/Machine')
const Fecha = require("../Models/Fechas")
const router = require('express').Router()
require('dotenv').config()
const cron = require('cron').CronJob
const isAuth = require('../Middlewares/isAuth')

function addHours(date, hours) {
    date.setHours(date.getHours() + hours)
    return date
}

const date = new Date()
const dateExact = addHours(date, 1)


// creation of current date in each machine
const newDate = async () => {

    const machines = await Machine.find({}).populate({ path: 'idFechas', model: 'Fecha' })

    machines.map(async machine => {
        const fecha = new Fecha()
        fecha.idMachine = machine._id
        machine.idFechas.push(fecha._id)
        fecha.turnos.push({ 'turn': 1 })
        await fecha.save()
        await machine.save()
    })

    console.log("run")

}


//configuration of crontab
const configCron = () => {
    console.log(dateExact.toLocaleString([], { hour12: true }))
    console.log(new Date())
    newDate(),
        null,
        true,
        'America/Chihuahua'
}


const crontab = new cron('0 13 * * *', configCron) //run every day at 01:00am
crontab.start()


//path to create machines, create each machine with current date
router.post('/create', isAuth, async (req, res) => {

    const data = req.body
    const machine = new Machine(data)
    const fecha = new Fecha()
    fecha.turnos.push({ 'turn': 1 })
    fecha.idMachine = machine._id
    machine.idFechas = fecha._id

    await fecha.save()
    const newMachine = await machine.save()

    res.send(newMachine)

})


//get all machines
router.get('/get', async (req, res) => {
    const machines = await Machine.find({})
    res.send({ machines })
})


//get specific machine with id
router.get('/get/:id', async (req, res) => {
    const { id } = req.params
    const machine = await Machine.findById(id)
    res.send(machine)
})


//get specific date filter by id of machine & inputDate = 2022-12-15 format in a range of the day
router.post('/getDate/:id', async (req, res) => {
    const { id } = req.params
    const { inputDate } = req.body

    const [date] = await Fecha.find({
        date: { $gte: `${inputDate}T00:00:00.000Z`, $lte: `${inputDate}T23:59:00.000Z` },
        idMachine: { $eq: id }
    })

    // if don't found any date, send an empty array
    res.send(date ? date : [])
})


//delete a machine with specific id by params, dont delete dates asociates with current machine
// todo: delete every dates when delete some machine
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    await Machine.findByIdAndDelete(id)
    res.send({ message: 'machine deleted' })
})


// update data of specific turn, first find by id machine then filter by range of dates
router.put('/update/:id', async (req, res) => {
    const data = req.body
    const { id } = req.params

    const [fecha] = await Fecha.find({
        date: { $gte: `${data.date}T00:00:00.000Z`, $lte: `${data.date}T23:59:00.000Z` },
        idMachine: { $eq: id }
    })

    // validate which turn is, one, two or three, then add data in tfurn into object and save it
    if (data.turn === '1') {
        fecha.turnos[0] = data
        await fecha.save()
        res.send({ message: 'turn 1, saved' })

    } else if (data.turn === '2') {
        fecha.turnos[1] = data
        await fecha.save()
        res.send({ message: 'turn 2, saved' })

    } else if (data.turn === '3') {
        fecha.turnos[2] = data
        await fecha.save()
        res.send({ message: 'turn 3 , saved' })

    } else {
        res.send({ message: 'dont save nothing' })
    }

})

module.exports = router