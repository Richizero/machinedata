const User = require('../Models/User')
const router = require('express').Router()
const bcrypt = require('bcrypt')
require('dotenv').config()

router.post('/', async (req, res) => {
    // todo validate if user exist previews
    try {
        const saltRound = 10
        const { username, password } = req.body
        const passwordHash = await bcrypt.hash(password, saltRound)

        const user = new User({
            username: username,
            password:passwordHash,
        })

        const saveUser = await user.save()

        res.status(201).json(saveUser)

    } catch (e) {
        console.error(e)
    }
})



module.exports = router
