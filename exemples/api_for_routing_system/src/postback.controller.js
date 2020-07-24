const { processHealth, processTemp, processRMMS } = require('hdr-process-data')
const { HDR_H1_ALGORITHMS } = require('./env')

 /**
 * @typedef ExpressRequest
 * @type {object}
 * @property {Array<{type: string, data: Array<{mac: string, rssi: string, raw: string, time: string}>}>} body - Request Body
 * @property {object} headers - Request Headers.
 * @property {object} params - Request Params.
 */
/**
 * POSTBACK CONTROLLER
 * @param {ExpressRequest} req
 * @returns {void}
 */
module.exports = function postBackController(req,res) {
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

  res.json({})
  return
}