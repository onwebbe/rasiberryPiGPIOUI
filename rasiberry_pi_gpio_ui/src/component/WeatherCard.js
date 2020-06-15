import React from 'react';
import DeviceDataService from '../utils/DeviceDataService';
class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      data: '',
      data2: ''
    }
    this.getDeviceData = this.getDeviceData.bind(this);
  }
  componentDidMount() {
    this.getDeviceData();
    this.timeInterval = setInterval(() => {
      this.getDeviceData();
    }, 5000);
  }
  componentWillUnmount() {
    // 组件卸载前卸载图表
    clearInterval(this.timeInterval);
  }
  async getDeviceData() {
    if (this.props.type === 'temperature') {
      var data = await DeviceDataService.getDHT22Data(this.props.piDeviceId);
      this.setState({
        data: data.temperature
      });
      
    } else if (this.props.type === 'humidity') {
      var data = await DeviceDataService.getDHT22Data(this.props.piDeviceId);
      this.setState({
        data: data.humidity
      });
    } else if (this.props.type === 'pressure') {
      var data = await DeviceDataService.getBMP180Data(this.props.piDeviceId);
      this.setState({
        data: data.pressure
      });
    } else if (this.props.type === 'rain') {
      var data = await DeviceDataService.getRainDropData(this.props.piDeviceId);
      this.setState({
        data: data.rain === 'rain' ? true: false
      });

      var data = await DeviceDataService.getGY30Data(this.props.piDeviceId2);
      this.setState({
        data2: data.lx
      });
    } else if (this.props.type === 'wind') {
      var data = await DeviceDataService.getRotationCountData(this.props.piDeviceId);
      this.setState({
        data: data
      });
    }
  }
  render() {
    var normalCard = <div className="weatherCard">
        <div className={"cardIcon icon " + this.props.type}></div>
  <div className="cardValue" style={{width: '50%', height: '2em', textAlign: 'left', paddingLeft: 5, fontSize: '1rem'}}>{this.state.data} {this.props.unit}</div>
      </div>;
    var switchCard = <div className="weatherCard switch">
      <div style={{display: 'flex', fontSize: '1.1rem', alignItems: 'center', justifyContent: 'center', width: '100%', borderBottom: '1px solid white'}}>
        <span className="icon light" style={{width: '1.2em', height: '1.2em', marginRight: 5, backgroundSize: '100% 100%', display: 'inline-block'}}></span>{this.state.data2} lx
      </div>
      <div className="switchCardContainer">
        <div className="switchContainer">
          <div className={"cardIcon icon rainny"}></div>
          <div className={`mask ${!this.state.data ? 'active' : ''}`}></div>
        </div>
        <div className="switchContainer">
          <div className={"cardIcon icon clearMorning"}></div>
          <div className={`mask ${this.state.data ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>;
    return (
      <div  className="weatherCardOutter">
        {this.props.category === 'switch'?switchCard : normalCard}
      </div>
    )
  }
}

export default WeatherCard;