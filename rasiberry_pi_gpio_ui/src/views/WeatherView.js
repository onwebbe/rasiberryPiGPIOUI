import React from 'react';
import WeatherTitle from '../component/WeatherTitle';
import WeatherCardList from '../component/WeatherCardList';
import WeatherCharts from '../component/WeatherCharts';
class WeatherView extends React.Component {
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
      <div className="weatherView">
        <WeatherTitle></WeatherTitle>
        <div className="weatherContent">
          <WeatherCardList></WeatherCardList>
          <WeatherCharts></WeatherCharts>
        </div>
      </div>
    )
  }
}

export default WeatherView;