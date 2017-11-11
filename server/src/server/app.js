'use strict'

const path = require('path')
    , koa = require('koa')
    , cors = require('koa2-cors')
    , sqlite3 = require('sqlite3')
    , bodyParser = require('koa-bodyparser')
    , serve = require('koa-static')
    , router = require('./routes')

const app = new koa()
    , setup = require('./setup')

const db = new sqlite3.Database('network-health.db')

app.use(bodyParser())
app.use(cors())

// handle general errors
app.on('error', (err) => console.error('[ERROR]', err))

// add database reference into app's context
app.use(async (ctx, next) => {
    ctx.state.db = db
    await next()
})

// set up database, if it necessary
setup(db)

// register all routers
app.use(router.routes())

module.exports = app
