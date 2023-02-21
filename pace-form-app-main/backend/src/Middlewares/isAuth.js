const jwt = require('jsonwebtoken')

module.exports = async function testMiddleware(req, res, next) {
    const authorization = req.header('authorization')
    let token
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.split(' ')[1]
        console.log({ token })
    }

    try {
        const decodedToke = await jwt.verify(token, process.env.SECRET_WORD)
        console.log({ decodedToke })
        if (!token || !decodedToke.id) {
            return res.status(401).json({ message: 'token missing or invalid' })
        }
    } catch (e) {
        next(e)
    }

    next()
}



