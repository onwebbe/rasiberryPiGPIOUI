import ServiceUrls from '../utils/ServiceUrls'
import axios from 'axios';

var DeviceDataService = {};
DeviceDataService.getDHT22Data = function(piDeviceId) {
  return new Promise(resolve => {
    var url = ServiceUrls.DHT22;
    url = url.replace('<piDeviceId>', piDeviceId);
    axios.get(url)
    .then((response) => {
      var responseData = response.data;
      if (responseData.success == true || responseData.success == 'true') {
        let piDeviceInfo = responseData.data;
        resolve(piDeviceInfo);
      } else {
        resolve(null);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  });
}
DeviceDataService.getBMP180Data = function(piDeviceId) {
  return new Promise(resolve => {
    var url = ServiceUrls.BMP180;
    url = url.replace('<piDeviceId>', piDeviceId);
    axios.get(url)
    .then((response) => {
      var responseData = response.data;
      if (responseData.success == true || responseData.success == 'true') {
        let piDeviceInfo = responseData.data;
        resolve(piDeviceInfo);
      } else {
        resolve(null)
      }
    })
    .catch((error) => {
      console.log(error);
    })
  });
}
DeviceDataService.getGY30Data = function(piDeviceId) {
  return new Promise(resolve => {
    var url = ServiceUrls.GY30;
    url = url.replace('<piDeviceId>', piDeviceId);
    axios.get(url)
    .then((response) => {
      var responseData = response.data;
      if (responseData.success == true || responseData.success == 'true') {
        let piDeviceInfo = responseData.data;
        resolve(piDeviceInfo);
      } else {
        resolve(null);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  });
}
DeviceDataService.getRainDropData = function(piDeviceId) {
  return new Promise(resolve => {
    var url = ServiceUrls.RainDrop;
    url = url.replace('<piDeviceId>', piDeviceId);
    axios.get(url)
    .then((response) => {
      var responseData = response.data;
      if (responseData.success == true || responseData.success == 'true') {
        let piDeviceInfo = responseData.data;
        resolve(piDeviceInfo);
      } else {
        resolve(null);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  });
}
DeviceDataService.getRotationCountData = function(piDeviceId) {
  return new Promise(resolve => {
    var url = ServiceUrls.RotationCount;
    url = url.replace('<piDeviceId>', piDeviceId);
    axios.get(url)
    .then((response) => {
      var responseData = response.data;
      if (responseData.success == true || responseData.success == 'true') {
        let piDeviceInfo = responseData.data;
        resolve(piDeviceInfo);
      } else {
        resolve(null);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  });
}
export default DeviceDataService;