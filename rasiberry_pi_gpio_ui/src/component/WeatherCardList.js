import React from 'react';
import WeatherCard from '././WeatherCard'
import { Row, Col } from 'antd';
class WeatherCardList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="weatherCardList">
        <Row gutter={16}>
          <Col xs={12} sm={12} md={8} lg={6}>
            <WeatherCard type="temperature" unit="°C" piDeviceId="2"></WeatherCard>
          </Col>
          <Col xs={12} sm={12} md={8} lg={6}>
            <WeatherCard type="humidity" unit="%" piDeviceId="2"></WeatherCard>
          </Col>
          <Col xs={12} sm={12} md={8} lg={6}>
            <WeatherCard type="pressure" unit="hpa" piDeviceId="3"></WeatherCard>
          </Col>
          <Col xs={12} sm={12} md={8} lg={6}>
            <WeatherCard type="rain" category="switch" piDeviceId="5" piDeviceId2="4"></WeatherCard>
          </Col>
          <Col xs={12} sm={12} md={8} lg={6}>
            <WeatherCard type="wind" piDeviceId="6"></WeatherCard>
          </Col>
        </Row>
      </div>
    )
  }
}

export default WeatherCardList;