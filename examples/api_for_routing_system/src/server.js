/**
 * DEPENDENCIES
 */
const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
/** */

/**
 * MODULES
 */
const postBackController = require('./postback.controller')

/**
 * SERVER INITIALIZATION
 */
const server = express()
server.use(cors())
server.use(helmet())
server.use(bodyParser.json())
/** */


/**
 * ROUTER REGISTER
 */
server.post('/senddata', postBackController)
/** */

/**
 * SERVER LISTENING
 */
const APP_PORT = process.env.PORT | 4000
server.listen(APP_PORT, ()=> console.log(`Server Listening on PORT: ${APP_PORT}`))
/** */