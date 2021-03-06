var ServiceURLs = {}
ServiceURLs.getGPIOOverall = '/api/v1/rasiberryPi/base/overview';
ServiceURLs.getDeviceList = '/api/v1/rasiberryPi/equiptment/getDevices';
ServiceURLs.createPiDevice = '/api/v1/rasiberryPi/equiptment/createPiDevice/<deviceId>'
ServiceURLs.getPiDeviceById = '/api/v1/rasiberryPi/equiptment/getPiDeviceById/<piDeviceId>'
ServiceURLs.getPiDevicesByDeviceId = '/api/v1/rasiberryPi/equiptment/getPiDevicesByDeviceId/<deviceId>'
ServiceURLs.updatePiDevice = '/api/v1/rasiberryPi/equiptment/updatePiDevice/<piDeviceId>'
ServiceURLs.deletePiDevice = '/api/v1/rasiberryPi/equiptment/deletePiDevice/<piDeviceId>'
ServiceURLs.getPiDevices = '/api/v1/rasiberryPi/equiptment/getPiDevices'
ServiceURLs.getPiDevicePins = '/api/v1/rasiberryPi/equiptment/getPiDevicePins/<piDeviceId>'
ServiceURLs.attachPiDevicePinToBoard = '/api/v1/rasiberryPi/equiptment/attachPiDevicePinToBoard/<piDevicePinId>'

ServiceURLs.LED = '/api/v1/rasiberryPi/equiptment/led/<piDeviceId>/<function>'
ServiceURLs.DHT22 = '/api/v1/rasiberryPi/equiptment/DHT22/<piDeviceId>'
ServiceURLs.BMP180 = '/api/v1/rasiberryPi/equiptment/BMP180/<piDeviceId>'
ServiceURLs.GY30 = '/api/v1/rasiberryPi/equiptment/GY30/<piDeviceId>'
ServiceURLs.RotationCount = '/api/v1/rasiberryPi/equiptment/RotationCount/<piDeviceId>'
ServiceURLs.RotationCountV2 = '/api/v1/rasiberryPi/equiptment/RotationCountV2/<piDeviceId>'
ServiceURLs.RainDrop = '/api/v1/rasiberryPi/equiptment/RainDrop/<piDeviceId>'
ServiceURLs.deviceImages = '/static/deviceImages/';

ServiceURLs.getSingleLineChartData = '/api/v1/rasiberryPi/equiptmentData/getTodaySingleGraphData/<piDeviceId>/<dataName>';

ServiceURLs.getHistoryChartList = '/api/v1/rasiberryPi/equiptmentData/getHistoryChartList'
ServiceURLs.addHistoryChartList = '/api/v1/rasiberryPi/equiptmentData/addHistoryChartList'
ServiceURLs.updateHistoryChartList = '/api/v1/rasiberryPi/equiptmentData/updateHistoryChartList/<chartId>'
ServiceURLs.deleteHistoryChart = '/api/v1/rasiberryPi/equiptmentData/deleteHistoryChart/<chartId>'
ServiceURLs.getDeviceDataNamesByDeviceId = '/api/v1/rasiberryPi/equiptmentData/getDeviceDataNamesByDeviceId/<piDeviceId>'

ServiceURLs.getDeviceImageUrl = function(deviceId) {
  return ServiceURLs.deviceImages + deviceId + '.jpg';
}
export default ServiceURLs;