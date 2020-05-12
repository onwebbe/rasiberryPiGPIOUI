import React from 'react';
import WeatherSingleLineChart from './WeatherSingleLineChart';
import WeatherTitle from './WeatherTitle';
class WeatherCharts extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      option_lx: {
        title: {
          text: '当日光照历史图',
          textStyle: {
            color: '#fff'
          },
          left: 'center',
          top: 10
        },
        xAxis: {
            type: 'category',
            data: ["16:00", "16:10", "16:20", "00:10", "00:20", "00:30", "00:40", "00:50", "01:00", "01:10", "01:20"]
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data:   [ "0.0", "0.0", "0.0", "19246.67", "19436.67", "20049.17", "20399.17", "20805.83", "21191.67", "21737.5", "24016.67" ],
            type: 'line',
            smooth: true
        }]
      },
      option_pressure: {
        title: {
          text: '当日光照历史图',
          textStyle: {
            color: '#fff'
          },
          left: 'center',
          top: 10
        },
        xAxis: {
            type: 'category',
            data: ["16:00",
            "16:10",
            "16:20",
            "00:10",
            "00:20",
            "00:30",
            "00:40",
            "00:50",
            "01:00",
            "01:10",
            "01:20"]
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data:   [ "1022.43",
            "1022.51",
            "1022.39",
            "1024.08",
            "1024.19",
            "1024.33",
            "1024.45",
            "1024.48",
            "1024.64",
            "1024.69",
            "1024.79" ],
            type: 'line',
            smooth: true
        }]
      }
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="weatherChartList">
        <div className="weatherChart">
          <WeatherSingleLineChart renderer='canvas' title="当日温度历史图" piDeviceId="2" dataName="temperature"></WeatherSingleLineChart>
          <WeatherSingleLineChart renderer='canvas' title="当日光照历史图" piDeviceId="4" dataName="lx" isAsK={true}></WeatherSingleLineChart>
          <WeatherSingleLineChart renderer='canvas' title="当日气压历史图" piDeviceId="3" dataName="pressure" isAsK={true}></WeatherSingleLineChart>
        </div>
      </div>
    )
  }
}

export default WeatherCharts;