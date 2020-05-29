import React from 'react';
import ServiceURLs from '../utils/ServiceUrls';
import axios from 'axios';
import { Select, Row, Col, Input } from 'antd';

const { Option } = Select;

class ChangePinDialogContent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      piDeviceList: [],
      deviceNameList: [],
      selectedValues: this.props.chartConfig ? this.props.chartConfig : {
        piDeviceID: '',
        deviceDataName: '',
        title: '',
        unit: '',
        displayType: ''
      }
    }
    this.getData = this.getData.bind(this);
    this.getPiDeviceList = this.getPiDeviceList.bind(this);
    this.getPiDeviceDataNameList = this.getPiDeviceDataNameList.bind(this);
    this.saveData = this.saveData.bind(this);
    this.addPiDeviceChart = this.addPiDeviceChart.bind(this);
  }
  componentDidMount() {
    // await this._getAllPerson();
    // await this._getPersonById(this.props.personId);
    this.props.getDialogContent(this);
    this.getData()
  }
  getData() {
    this.getPiDeviceList();
    if (this.state.selectedValues.piDeviceID != null && this.state.selectedValues.piDeviceID != '') {
      this.getPiDeviceDataNameList(this.state.selectedValues.piDeviceID);
    }
  }
  getPiDeviceList() {
    return new Promise(resolve => {
      axios.get(ServiceURLs.getPiDevices)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let piDeviceList = responseData.data;
          this.setState({
            piDeviceList: piDeviceList
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
  getPiDeviceDataNameList(piDeviceId) {
    return new Promise(resolve => {
      let url = ServiceURLs.getDeviceDataNamesByDeviceId;
      url = url.replace('<piDeviceId>', piDeviceId);
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let deviceNameList = responseData.data;
          this.setState({
            deviceNameList: deviceNameList
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
  saveData() {
    if (this.selectedValues.id === null) {
      this.addPiDeviceChart();
    }
  }
  addPiDeviceChart() {
    return new Promise(resolve => {
      let url = ServiceURLs.addHistoryChartList;
      var data = this.state.selectedValues;
      axios.post(url, data)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
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
    var piDeviceOptions = [];
    this.state.piDeviceList.forEach((value) => {
      let deviceOption = <Option value={value.id} key={value.id}>
        {value.piDeviceName}
      </Option>;
      piDeviceOptions.push(deviceOption);
    });
    var deviceNameOptions = [];
    this.state.deviceNameList.forEach(value => {
      let deviceNameOption = <Option value={value}>
        {value}
      </Option>;
      deviceNameOptions.push(deviceNameOption);
    });
    return (
      <div className="">
        <Row>
          <Col span="24">
            pi设备
            <Select
              mode="single"
              placeholder="清选择一个树莓派的设备"
              onChange={(value) => {
                var selectedConfig = this.state.selectedValues;
                selectedConfig.piDeviceID = value;
                this.setState({
                  selectedValues: selectedConfig
                });
                this.getPiDeviceDataNameList(value);
              }}
              defaultValue={this.state.selectedValues.piDeviceID}
              style={{width: '100%'}}>
              {piDeviceOptions}
            </Select>
          </Col>
          <Col span="24">
            数据名称
            <Select
              mode="single"
              placeholder="清选择一个树莓派的设备"
              onChange={(value) => {
                var selectedConfig = this.state.selectedValues;
                selectedConfig.deviceDataName = value;
                this.setState({
                  selectedValues: selectedConfig
                });
              }}
              defaultValue={this.state.selectedValues.deviceDataName}
              style={{width: '100%'}}>

              {deviceNameOptions}
            </Select>
          </Col>
          <Col span="24">
            图表标题
            <Input
              value={this.state.selectedValues.title}
              onChange={(evt) => {
                var selectedConfig = this.state.selectedValues;
                selectedConfig.title = evt.target.value;
                this.setState({
                  selectedValues: selectedConfig
                });
              }}></Input>
          </Col>
          <Col span="24">
            数据单位
            <Input
              value={this.state.selectedValues.unit}
              onChange={(evt) => {
                var selectedConfig = this.state.selectedValues;
                selectedConfig.unit = evt.target.value;
                this.setState({
                  selectedValues: selectedConfig
                });
              }}></Input>
          </Col>
          <Col span="24">
            数据显示类型
            <Input
              value={this.state.selectedValues.displayType}
              onChange={(evt) => {
                var selectedConfig = this.state.selectedValues;
                selectedConfig.displayType = evt.target.value;
                this.setState({
                  selectedValues: selectedConfig
                });
              }}></Input>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ChangePinDialogContent;