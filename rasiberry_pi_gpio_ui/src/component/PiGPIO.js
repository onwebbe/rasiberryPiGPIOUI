import React from 'react';
import GPIOPin from './GPIOPin'
import { PlusOutlined } from '@ant-design/icons';

class PiGPIO extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      pi: null,
      piPinList: []
    }
    this.updatePiStatus = this.updatePiStatus.bind(this);
  }
  componentDidMount() {
    // await this._getAllPerson();
    // await this._getPersonById(this.props.personId);
    this.updatePiStatus();
  }
  updatePiStatus() {
    let obj = { "success": true, "data": { "mode": "BCM", "type": "3B+", "pinList": [ { "pinStatus": "", "BCM": -1, "Physical": 1, "Name": "3.3v", "mode": "" }, { "pinStatus": "", "BCM": -1, "Physical": 2, "Name": "5v", "mode": "" }, { "pinStatus": "", "BCM": 2, "Physical": 3, "Name": "SDA.1", "mode": "ALT0" }, { "pinStatus": "", "BCM": -1, "Physical": 4, "Name": "5v", "mode": "" }, { "pinStatus": "", "BCM": 3, "Physical": 5, "Name": "SCL.1", "mode": "ALT0" }, { "pinStatus": "", "BCM": -1, "Physical": 6, "Name": "0v", "mode": "" }, { "pinStatus": 0, "BCM": 4, "Physical": 7, "Name": "GPIO. 7", "mode": "IN" }, { "pinStatus": 0, "BCM": 14, "Physical": 8, "Name": "TxD", "mode": "IN" }, { "pinStatus": "", "BCM": -1, "Physical": 9, "Name": "0v", "mode": "" }, { "pinStatus": 1, "BCM": 15, "Physical": 10, "Name": "RxD", "mode": "IN" }, { "pinStatus": 0, "BCM": 17, "Physical": 11, "Name": "GPIO. 0", "mode": "IN" }, { "pinStatus": 0, "BCM": 18, "Physical": 12, "Name": "GPIO. 1", "mode": "IN" }, { "pinStatus": 0, "BCM": 27, "Physical": 13, "Name": "GPIO. 2", "mode": "IN" }, { "pinStatus": "", "BCM": -1, "Physical": 14, "Name": "0v", "mode": "" }, { "pinStatus": 0, "BCM": 22, "Physical": 15, "Name": "GPIO. 3", "mode": "IN" }, { "pinStatus": 0, "BCM": 23, "Physical": 16, "Name": "GPIO. 4", "mode": "IN" }, { "pinStatus": "", "BCM": -1, "Physical": 17, "Name": "3.3v", "mode": "" }, { "pinStatus": 0, "BCM": 24, "Physical": 18, "Name": "GPIO. 5", "mode": "IN" }, { "pinStatus": 0, "BCM": 10, "Physical": 19, "Name": "MOSI", "mode": "IN" }, { "pinStatus": "", "BCM": -1, "Physical": 20, "Name": "0v", "mode": "" }, { "pinStatus": 0, "BCM": 9, "Physical": 21, "Name": "MISO", "mode": "IN" }, { "pinStatus": 0, "BCM": 25, "Physical": 22, "Name": "GPIO. 6", "mode": "IN" }, { "pinStatus": 0, "BCM": 11, "Physical": 23, "Name": "SCLK", "mode": "IN" }, { "pinStatus": 1, "BCM": 8, "Physical": 24, "Name": "CE0", "mode": "IN" }, { "pinStatus": "", "BCM": -1, "Physical": 25, "Name": "0v", "mode": "" }, { "pinStatus": 1, "BCM": 7, "Physical": 26, "Name": "CE1", "mode": "IN" }, { "pinStatus": 1, "BCM": 0, "Physical": 27, "Name": "SDA.0", "mode": "IN" }, { "pinStatus": 1, "BCM": 1, "Physical": 28, "Name": "SCL.0", "mode": "IN" }, { "pinStatus": 1, "BCM": 5, "Physical": 29, "Name": "GPIO.21", "mode": "IN" }, { "pinStatus": "", "BCM": -1, "Physical": 30, "Name": "0v", "mode": "" }, { "pinStatus": 1, "BCM": 6, "Physical": 31, "Name": "GPIO.22", "mode": "IN" }, { "pinStatus": 0, "BCM": 12, "Physical": 32, "Name": "GPIO.26", "mode": "IN" }, { "pinStatus": 0, "BCM": 13, "Physical": 33, "Name": "GPIO.23", "mode": "IN" }, { "pinStatus": "", "BCM": -1, "Physical": 34, "Name": "0v", "mode": "" }, { "pinStatus": 0, "BCM": 19, "Physical": 35, "Name": "GPIO.24", "mode": "IN" }, { "pinStatus": 0, "BCM": 16, "Physical": 36, "Name": "GPIO.27", "mode": "IN" }, { "pinStatus": 0, "BCM": 26, "Physical": 37, "Name": "GPIO.25", "mode": "IN" }, { "pinStatus": 0, "BCM": 20, "Physical": 38, "Name": "GPIO.28", "mode": "IN" }, { "pinStatus": "", "BCM": -1, "Physical": 39, "Name": "0v", "mode": "" }, { "pinStatus": 0, "BCM": 21, "Physical": 40, "Name": "GPIO.29", "mode": "IN" } ] } };
    let piData = obj.data;
    this.setState({
      pi: piData,
      piPinList: piData.pinList
    });
  }
  render() {
    var pinList = this.state.piPinList;
    if (pinList == null) {
      pinList = [];
    }
    var pinListElementLeft = [];
    var pinListElementRight = [];
    pinList.forEach((value, idx) => {
      if (idx % 2 === 0) {
        pinListElementLeft.push(
          <GPIOPin pinObject={value} className="comp_gpioPin" position="left">
          </GPIOPin>)
      } else {
        pinListElementRight.push(
          <GPIOPin pinObject={value} className="comp_gpioPin" position="right">
          </GPIOPin>)
      }
      
    })
    return (
      <div style={{padding: 20, width: 250, display: 'flex', flexFlow: 'row'}}>
        <div className="GPIOLeft" style={{display: 'flex', flexFlow: 'column', alignContent: 'middle'}}>
          {pinListElementLeft}
        </div>
        <div className="GPIORight" style={{display: 'flex', flexFlow: 'column', alignContent: 'middle'}}>
          {pinListElementRight}
        </div>
      </div>
    )
  }
}

export default PiGPIO;