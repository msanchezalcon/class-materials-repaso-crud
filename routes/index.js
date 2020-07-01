module.exports = app => {
    app.use('/', require('./site.routes.js'))
    app.use('/parks', require('./park.routes.js'))
    app.use('/coasters', require('./coaster.routes.js'))
}

