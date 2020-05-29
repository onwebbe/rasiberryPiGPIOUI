import React from 'react';
import ServiceURLs from '../utils/ServiceUrls';
import axios from 'axios';
import { Select } from 'antd';

const { Option } = Select;

class ChangePinDialogContent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      piDevicePinList: this.props.piDevicePinList,
      selectGPIOPinList: []
    }
    this.getData = this.getData.bind(this);
    this.gpioSelectChange = this.gpioSelectChange.bind(this);
    this.populatePiGPIOPinSelector = this.populatePiGPIOPinSelector.bind(this);
  }
  componentDidMount() {
    // await this._getAllPerson();
    // await this._getPersonById(this.props.personId);
    this.getData()
  }
  getData() {
    return new Promise(resolve => {
      axios.get(ServiceURLs.getGPIOOverall)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let selectPinList = this.populatePiGPIOPinSelector(responseData.data.pinList);
          this.setState({
            selectGPIOPinList: selectPinList
          })
        }
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
      })
    });
  }
  populatePiGPIOPinSelector(gpioPinList) {
    var pinSelectData = [];
    gpioPinList.forEach((pin, index) => {
      var displayText = pin.Name + ' (BOARD:' + pin.Physical + ')-(BCM:' + pin.BCM + ')';
      var selectPinObj = {
        title: displayText,
        boardId: pin.Physical,
        name: pin.Name,
        bcm: pin.BCM
      }
      pinSelectData.push(selectPinObj);
    });
    var selectPinObj = {
      title: '没有插在任何一个端口',
      boardId: -1,
      name: '没有插在任何一个端口',
      bcm: -1
    }
    pinSelectData.push(selectPinObj)
    return pinSelectData;
  }
  gpioSelectChange(boardId, piDevicePinId) {
    return new Promise(resolve => {
      var url = ServiceURLs.attachPiDevicePinToBoard;
      url = url.replace('<piDevicePinId>', piDevicePinId);
      axios.get(url, {
        params: {
          boardId: boardId
        }
      })
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          this.getData();
        }
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
      })
    });
  }
  render() {
    var selectOptionList = [];
    this.state.selectGPIOPinList.forEach((gpioPin, index) => {
      if (gpioPin.boardId != -1) {
        var optionItem = <Option value={gpioPin.boardId} key={gpioPin.boardId}>
          <div className="demo-option-label-item">
            <span>
              {gpioPin.name}
            </span>
            <span style={{paddingLeft: 5}}>
              (BOARD: {gpioPin.boardId})
            </span>
            <span style={{paddingLeft: 5}}>
              (BCM: {gpioPin.bcm})
            </span>
          </div>
        </Option>
        selectOptionList.push(optionItem);
      } else {
        var optionItem = <Option value={gpioPin.boardId} key={gpioPin.boardId}>
          <div className="demo-option-label-item">
            <span>
              {gpioPin.name}
            </span>
          </div>
        </Option>
        selectOptionList.push(optionItem);
      }
      
    });
    console.log(selectOptionList.length)

    var pinSelector = [];
    var pinListObjectList = [];
    this.state.piDevicePinList.forEach((pin, index) => {
      var functionName = pin.devicePinDetail.pinFunction_TR;
      var boardId = pin.pinBoardID;
      var piPinId = pin.id;
      var pinListObject = <div style={{borderBottom: '1px solid #f0f0f0', height: 30, display: 'flex', flexFlow:'row', alignItems: 'center'}}>
        <span style={{width: 30, display: 'inline-block'}}>{index}</span>
        <span style={{width: 50, display: 'inline-block'}}>{functionName}</span>
        <span>
          <Select
            mode="single"
            style={{ width: '100%' }}
            placeholder="清选择一个树莓派的端口"
            onChange={(value) => {this.gpioSelectChange(value, piPinId)}}
            defaultValue={boardId}
            style={{width: 270}}
          >
            {selectOptionList}
          </Select>
        </span>
      </div>
      pinListObjectList.push(pinListObject);
    })
    return (
      <div className="change_pin_dialog_content" style={{display: 'flex', flexFlow: 'column', justifyContent: this.state.position == 'left'?'flex-end':'flex-start' }}>
        {pinListObjectList}
      </div>
    )
  }
}

export default ChangePinDialogContent;