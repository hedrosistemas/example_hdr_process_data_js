/**
 * DEPENDENCIES
 */
const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const { processHealth, processTemp, processRMMS } = require('hdr-process-data')
/** */

/**
 * SERVER INITIALIZATION
 */
const server = express()
server.use(cors())
server.use(helmet())
server.use(helmet())
server.use(bodyParser.json())
/** */

/**
 * HDR_H1_ALGORITHMS
 */
const HDR_H1_ALGORITHMS = {
  "health": "health",
  "temp": "temp",
  "rms2": "rms2",
  "rmms": "rmms",
  "tilt": "tilt",
  "fft": "fft",
  "accRaw": "accRaw",
}
/** */

/**
 * POSTBACK CONTROLLER
 */
function postBackController(req,res) {
  const postBackArray = req.body

  let healthCollectedData = []
  let tempCollectedData = []
  let rmmsCollectedData = [];

  postBackArray.forEach(postBackData=> {
    switch(postBackData.type) {
      case HDR_H1_ALGORITHMS.health:
        healthCollectedData = postBackData.data
        break;
      case HDR_H1_ALGORITHMS.temp:
        tempCollectedData = postBackData.data
        break;
      case HDR_H1_ALGORITHMS.rmms:
        rmmsCollectedData = postBackData.data
        break;
      default:
        break;
    }
  })

  /**
   * IF WANT TO PROCESS DATA
   */
  const processedHealth = [];
  const processedTemp = [];
  const processedRMMS = [];
  if(healthCollectedData.length) {
    healthCollectedData.forEach(healthData => {
      processedHealth.push(...processHealth(healthData.mac, healthData.raw, healthData.rssi, healthData.time))
    })
    console.log('**********HEALTH***********')
    console.table(processedHealth)
    console.log('***************************')
  }
  if(tempCollectedData.length) {
    tempCollectedData.forEach(tempData => {
      processedTemp.push(...processTemp(tempData.mac, tempData.raw, tempData.rssi, tempData.time))
    })
    console.log('***********TEMP************')
    console.table(processedTemp)
    console.log('***************************')
  }
  if(rmmsCollectedData.length) {
    rmmsCollectedData.forEach(rmmsData => {
      processedRMMS.push(...processRMMS(rmmsData.mac, rmmsData.raw, rmmsData.rssi, rmmsData.time))
    })
    console.log('***********RMMS************')
    console.table(processedRMMS)
    console.log('***************************')
  }

  return res.json({})
}
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