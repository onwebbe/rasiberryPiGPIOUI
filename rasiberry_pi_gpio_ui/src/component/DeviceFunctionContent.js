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
    }
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
        setTimeout(() => {
          this.props.refreshPIGPIOStatus();
        }, 100);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        this.props.closePopoverFunction();
        setTimeout(() => {
          this.props.refreshPIGPIOStatus();
        }, 100);
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
        setTimeout(() => {
          this.props.refreshPIGPIOStatus();
        }, 100);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        this.props.closePopoverFunction();
        setTimeout(() => {
          this.props.refreshPIGPIOStatus();
        }, 100);
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
              <a href="#" onClick={item.functionitem}>{item.name}</a>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default DeviceFunctionContent;