var ServiceURLs = {}
ServiceURLs.getGPIOOverall = '/api/v1/rasiberryPi/base/overview';
ServiceURLs.getDeviceList = '/api/v1/rasiberryPi/equiptment/getDevices';
ServiceURLs.createPiDevice = '/api/v1/rasiberryPi/equiptment/createPiDevice/<deviceId>'
ServiceURLs.getPiDeviceById = '/api/v1/rasiberryPi/equiptment/getPiDeviceById/<piDeviceId>'
ServiceURLs.getPiDevicesByDeviceId = '/api/v1/rasiberryPi/equiptment/getPiDevicesByDeviceId/<deviceId>'
ServiceURLs.updatePiDevice = '/api/v1/rasiberryPi/equiptment/updatePiDevice/<piDeviceId>'
ServiceURLs.deletePiDevice = '/api/v1/rasiberryPi/equiptment/deletePiDevice/<piDeviceId>'
ServiceURLs.getPiDevices = '/api/v1/rasiberryPi/equiptment/getPiDevices'

ServiceURLs.deviceImages = '/static/deviceImages/';

ServiceURLs.getDeviceImageUrl = function(deviceId) {
  return ServiceURLs.deviceImages + deviceId + '.jpg';
}
export default ServiceURLs;