import React from 'react';
import { List, Avatar, Modal, Button, Input, notification } from 'antd';
import axios from 'axios';
import ServiceUrls from '../utils/ServiceUrls'
class DeviceFunctionContent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      deviceFunction: [],
      piDeviceId: this.props.deviceInfo.id
    }
    this.LED_lightOn = this.LED_lightOn.bind(this);
    this.LED_shutdown = this.LED_shutdown.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }
  componentDidMount() {
    // await this._getAllPerson();
    // await this._getPersonById(this.props.personId);
    var deviceInfo = this.props.deviceInfo.deviceDetail;
    var deviceType = deviceInfo.deviceType;
    if (deviceType === 'LED') {
      var ledFunctions = [];
      var lightOn = {
        name: '开灯',
        functionitem: this.LED_lightOn
      }
      ledFunctions.push(lightOn);
      var lightOff = {
        name: '关灯',
        functionitem: this.LED_shutdown
      }
      ledFunctions.push(lightOff);
      this.setState({
        deviceFunction: ledFunctions
      })
    } else if (deviceType === 'DHT22' || deviceType === 'BMP180' || deviceType === 'GY30' || deviceType === 'RAINDROP') {
      var startStopDeviceFunctions = [];
      var start = {
        name: '开始',
        functionitem: this.start
      }
      startStopDeviceFunctions.push(start);
      var stop = {
        name: '停止',
        functionitem: this.stop
      }
      startStopDeviceFunctions.push(stop);
      this.setState({
        deviceFunction: startStopDeviceFunctions
      })
    }
    var parent = this.props.passToChildren();
    parent.markDeviceAsStopped();
  }
  start() {
    var parent = this.props.passToChildren();
    parent.cardDataRef.start();
    parent.markDeviceAsRunning();
    this.props.closePopoverFunction();
  }
  stop() {
    var parent = this.props.passToChildren();
    parent.cardDataRef.stop();
    parent.markDeviceAsStopped();
    this.props.closePopoverFunction();
  }
  LED_lightOn() {
    return new Promise(resolve => {
      var url = ServiceUrls.LED;
      url = url.replace('<piDeviceId>', this.state.piDeviceId);
      url = url.replace('<function>', 'on');
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
        }
        this.props.closePopoverFunction();
        this.props.refreshPIGPIOStatus();
        resolve();
      })
      .catch((error) => {
        console.log(error);
        this.props.closePopoverFunction();
        this.props.refreshPIGPIOStatus();
        resolve();
      })
    });
  }
  LED_shutdown() {
    return new Promise(resolve => {
      var url = ServiceUrls.LED;
      url = url.replace('<piDeviceId>', this.state.piDeviceId);
      url = url.replace('<function>', 'off');
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
        }
        this.props.closePopoverFunction();
        this.props.refreshPIGPIOStatus();
        resolve();
      })
      .catch((error) => {
        console.log(error);
        this.props.closePopoverFunction();
        this.props.refreshPIGPIOStatus();
        resolve();
      })
    });
  }
  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <div className="deviceFunctions">
        <List
          itemLayout="horizontal"
          dataSource={this.state.deviceFunction}
          renderItem={item => (
            <List.Item>
              <a onClick={item.functionitem}>{item.name}</a>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default DeviceFunctionContent;