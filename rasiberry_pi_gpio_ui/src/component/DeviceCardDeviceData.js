import React from 'react';
import { Card, Row, Col  } from 'antd';
import { EditOutlined, DownCircleOutlined, SettingOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import ServiceUrls from '../utils/ServiceUrls'
import axios from 'axios';
import ChangePinDialogContent from './ChangePinDialogContent' 
import DeviceFunctionContent from './DeviceFunctionContent'

const { Meta } = Card;

class DeviceCardDeviceData extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    
    this.getData = this.getData.bind(this);
    this.getDHT22Data = this.getDHT22Data.bind(this);
    this.getBMP180Data = this.getBMP180Data.bind(this);
    this.state = {
      deviceData: null
    }
  }
  componentDidMount() {
    this.props.onCardDataRef(this);
    // await this._getAllPerson();
    // await this._getPersonById(this.props.personId);
    this.getData();
  }
  start() {
    if (this.time != null) {
      return;
    }
    this.timer = setInterval(()=> {
      this.getData();
    }, 10000);
  }
  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }
  getData() {
    if (this.props.piDeviceInfo) {
      if (this.props.piDeviceInfo.deviceDetail.deviceType === 'DHT22') {
        this.getDHT22Data();
      } else if (this.props.piDeviceInfo.deviceDetail.deviceType === 'BMP180') {
        this.getBMP180Data();
      }
    }
  }
  getDHT22Data() {
    return new Promise(resolve => {
      var url = ServiceUrls.DHT22;
      url = url.replace('<piDeviceId>', this.props.piDeviceInfo.id);
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let piDeviceInfo = responseData.data;
          let data = <div><Row>
          <Col span="12">
                温度 {piDeviceInfo.temperature} °C
            </Col>
            <Col span="12">
                湿度 {piDeviceInfo.humidity} %
            </Col>
          </Row>
          </div>
          this.setState({
            deviceData: data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }
  getBMP180Data() {
    return new Promise(resolve => {
      var url = ServiceUrls.BMP180;
      url = url.replace('<piDeviceId>', this.props.piDeviceInfo.id);
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let piDeviceInfo = responseData.data;
          // let data = '气压：' + piDeviceInfo.pressure +  ' PA 温度：' + piDeviceInfo.temperature + '°C altitude：' + piDeviceInfo.altitude;
          let data = <div><Row>
            <Col span="24">
                气压 {piDeviceInfo.pressure}
            </Col>
          </Row>
          <Row>
          <Col span="12">
                温度 {piDeviceInfo.temperature} °C
            </Col>
            <Col span="12">
                海拔 {piDeviceInfo.altitude}
            </Col>
          </Row>
          </div>
          this.setState({
            deviceData: data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }
  render() {
    return (
      <div style={{marginTop: 5, paddingTop: 5, borderTop: this.state.deviceData==null?'none': '1px solid grey'}}>
        {this.state.deviceData}
      </div>
    )
  }
}

export default DeviceCardDeviceData;