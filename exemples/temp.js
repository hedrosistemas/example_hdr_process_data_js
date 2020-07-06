const {processTemp} = require('hdr-process-data')

const mockH1TempMessage = {
  adv: '034c011601ba07',
  mac: '000000000001',
  rssi: '-74',
  time: '1580221520'
}

const temp = processTemp(
  mockH1TempMessage.mac,
  mockH1TempMessage.adv,
  mockH1TempMessage.rssi,
  mockH1TempMessage.time
)

console.log(temp)