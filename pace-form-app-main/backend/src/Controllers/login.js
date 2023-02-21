const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = require('express').Router()
require('dotenv').config()

router.post('/', async (req, res) => {
    const { username, password } = req.body
    console.log(username)
    const isUser = await User.findOne({ username } )

    if (!isUser) {
        res.send(false )
        return
    }

    const result = await bcrypt.compare(password, isUser?.password).then((res) => {
        return res
    });

    if (!result || !result ) {
        res.send(false )
        return
    }

    const token = jwt.sign({ id: isUser.id }, process.env.SECRET_WORD, {
        expiresIn: 60 * 60 * 24 //1 days
    })

    const dataUser = {
        username,
        token
    }

    res.send( dataUser )
})

module.exports = router