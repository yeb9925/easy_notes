const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const app = express()
module.exports = app

if (process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = () => {
  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use('/api', require('./api'));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
    if (path.extname(req.path).length) {
        const err = new Error('Not found')
        err.status = 404
        next(err)
    } else {
        next()
    }
})

// error handling endware
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const startListening = () => {
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
}

const syncDb = () => db.sync()
    if (require.main === module) {
        syncDb
        .then(createApp)
        .then(startListening)
    } else {
    createApp()
    }
}