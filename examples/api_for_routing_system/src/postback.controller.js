const fs = require('fs');
const { processHealth, processTemp, processRMMS, processAccRaw, processFFT } = require('hdr-process-data')
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
  let accRawCollectedData = [];
  let fftCollectedData = [];


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
      case HDR_H1_ALGORITHMS.fft:
        fftCollectedData = postBackData.data
        break;
      case HDR_H1_ALGORITHMS.accRaw:
        accRawCollectedData = postBackData.data
        break;
      default:
        break;
    }
  })

  /**
   * IF WANT TO PROCESS DATA
   */
  let processedHealth = {};
  const processedTemp = [];
  const processedRMMS = [];
  let processedAccRaw = {};
  let processedFFT = {};

  if(healthCollectedData.length) {
    healthCollectedData.forEach(healthData => {
      processedHealth = processHealth(healthData.mac, healthData.raw, healthData.rssi, healthData.time)
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
  if(accRawCollectedData.length) {
    accRawCollectedData.forEach(accRawData => {
      processedAccRaw = processAccRaw(accRawData.mac, accRawData.raw, accRawData.rssi, accRawData.time)
    })
    console.log('**********ACC RAW**********')
    fs.writeFile(`ACC-RAW-${Date.now()}.json`, JSON.stringify(processedAccRaw), 'utf8', ()=>{});
    console.log('***************************')
  }
  if(fftCollectedData.length) {  
    fftCollectedData.forEach(fftData => {
      processedFFT = processFFT(fftData.mac, fftData.raw, fftData.rssi, fftData.time)
    })
    console.log('**********  FFT  **********')
    fs.writeFile(`FFT-${Date.now()}.json`, JSON.stringify(processedFFT), 'utf8', ()=>{});
    console.log('***************************')
  }

  res.json({})
  return
}