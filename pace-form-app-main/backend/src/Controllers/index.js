const routeMachines = require('./machine')
const routeLogin = require('./login')
const routeRegister = require('./register')
const routeIsAlive = require('./isAlive')

function routerApi(app) {
    app.use('/', routeIsAlive)
    app.use('/login', routeLogin)
    app.use('/register', routeRegister)
    app.use('/machine', routeMachines)
}

module.exports = routerApi