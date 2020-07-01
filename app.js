require('dotenv').config()

const express = require('express')
const app = express()

// DB, middlewares, locals & debug
require('./configs/mongoose.config')
require('./configs/middlewares.config')(app)
require('./configs/preprocessor.config')(app)
require('./configs/locals.config')(app)
require('./configs/debug.config')



// Base URL's
require('./routes')(app) //siempre busca index

// app.use('/', require('./routes/base.routes'))
// app.use('/', require('./routes/coaster.routes'))
// app.use('/', require('./routes/park.routes'))
// app.use('/', require('./routes/index'))


module.exports = app