import React from 'react';
import DeviceDataService from '../utils/DeviceDataService';
class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      
    }
    this.getDeviceData = this.getDeviceData.bind(this);
  }
  componentDidMount() {
    this.getDeviceData();
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
      
    }
  }
  render() {
    var normalCard = <div className="weatherCard">
        <div className={"cardIcon icon " + this.props.type}></div>
  <div className="cardValue" style={{width: '50%', height: '2em', textAlign: 'left', paddingLeft: 5, fontSize: '1rem'}}>{this.state.data} {this.props.unit}</div>
      </div>;
    var switchCard = <div className="weatherCard switch">
      <div className="switchContainer">
        <div className={"cardIcon icon rainny"}></div>
        <div className={"mask " + this.state.data ? 'active': ''}></div>
      </div>
      <div className="switchContainer">
        <div className={"cardIcon icon clearMorning"}></div>
        <div className={"mask " + this.state.data ? '': 'active'}></div>
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