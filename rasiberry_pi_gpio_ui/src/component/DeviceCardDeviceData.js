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
    this.getGY30Data = this.getGY30Data.bind(this);
    this.getRainDropData = this.getRainDropData.bind(this);
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
    }, 3000);
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
      } else if (this.props.piDeviceInfo.deviceDetail.deviceType === 'GY30') {
        this.getGY30Data();
      } else if (this.props.piDeviceInfo.deviceDetail.deviceType === 'RAINDROP') {
        this.getRainDropData();
      } else if (this.props.piDeviceInfo.deviceDetail.deviceType === 'HRotation') {
        this.getRataionCount();
      } else if (this.props.piDeviceInfo.deviceDetail.deviceType === 'HallV2') {
        this.getRataionCountV2();
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
                气压 {piDeviceInfo.pressure} hPa
            </Col>
          </Row>
          <Row>
          <Col span="12">
                温度 {piDeviceInfo.temperature} °C
            </Col>
            <Col span="12">
                海拔 {piDeviceInfo.altitude} 米
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
  getGY30Data() {
    return new Promise(resolve => {
      var url = ServiceUrls.GY30;
      url = url.replace('<piDeviceId>', this.props.piDeviceInfo.id);
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let piDeviceInfo = responseData.data;
          let data = <div><Row>
          <Col span="24">
                光照 {piDeviceInfo.lx} lx
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
  getRainDropData() {
    return new Promise(resolve => {
      var url = ServiceUrls.RainDrop;
      url = url.replace('<piDeviceId>', this.props.piDeviceInfo.id);
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let piDeviceInfo = responseData.data;
          let data = <div><Row>
          <Col span="24">
               现在 {piDeviceInfo.rain === 'rain'? <span style={{color: 'red'}}>！！！下雨了！！！</span>: <span style={{color: 'green'}}>没有雨</span>}
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
  getRataionCount() {
    return new Promise(resolve => {
      var url = ServiceUrls.RotationCount;
      url = url.replace('<piDeviceId>', this.props.piDeviceInfo.id);
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let speedData = responseData.data;
          let data = <div><Row>
          <Col span="24">
            {speedData} RPM
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
  getRataionCountV2() {
    return new Promise(resolve => {
      var url = ServiceUrls.RotationCountV2;
      url = url.replace('<piDeviceId>', this.props.piDeviceInfo.id);
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let speedData = responseData.data;
          speedData = speedData * 100;
          speedData = Math.round(speedData);
          speedData = speedData / 100;
          let data = <div><Row>
          <Col span="24">
            {speedData} RPM
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