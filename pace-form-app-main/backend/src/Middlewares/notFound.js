module.exports = ((req, res, next) => {
    res.status(404).send({message: 'there is nothing here'})
    next()
})
