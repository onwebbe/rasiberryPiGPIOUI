import React from 'react';
import WeatherSingleLineChartLink from './WeatherSingleLineChartLink';
import WeatherTitle from './WeatherTitle';
import ServiceUrls from '../utils/ServiceUrls'
import axios from 'axios';

class WeatherCharts extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      chartList: []
    }
    this.getWeatherChartList = this.getWeatherChartList.bind(this);
  }
  componentDidMount() {
    this.getWeatherChartList();
  }
  getWeatherChartList() {
    return new Promise(resolve => {
      axios.get(ServiceUrls.getHistoryChartList)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let chartList = responseData.data;
          this.setState({
            'chartList': chartList
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }
  render() {
    var chartListEle = [];
    this.state.chartList.forEach(chart => {
      chartListEle.push(<WeatherSingleLineChartLink key={chart.id} renderer='canvas' title={chart.title} piDeviceId={chart.piDeviceID} dataName={chart.deviceDataName} isAsK={chart.displayType == 1}></WeatherSingleLineChartLink>);
    })
    return (
      <div className="weatherChartList">
        <div className="weatherChart">
          {/* <WeatherSingleLineChartLink renderer='canvas' title="当日温度历史图" piDeviceId="2" dataName="temperature"></WeatherSingleLineChartLink>
          <WeatherSingleLineChartLink renderer='canvas' title="当日湿度历史图" piDeviceId="2" dataName="humidity"></WeatherSingleLineChartLink>
          <WeatherSingleLineChartLink renderer='canvas' title="当日光照历史图" piDeviceId="4" dataName="lx" isAsK={true}></WeatherSingleLineChartLink>
          <WeatherSingleLineChartLink renderer='canvas' title="当日气压历史图" piDeviceId="3" dataName="pressure"></WeatherSingleLineChartLink> */}
          {chartListEle}
        </div>
      </div>
    )
  }
}

export default WeatherCharts;