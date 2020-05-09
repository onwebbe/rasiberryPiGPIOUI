import React from 'react';
import moment from 'moment';

class WeatherTitle extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.formatWeekDay = this.formatWeekDay.bind(this);
    this.setStateData = this.setStateData.bind(this);
    this.state = {
      date: '',
      time: ''
    }
  }
  componentDidMount() {
    this.setStateData();
    setInterval(() => {
      this.setStateData();
    }, 1000);
  }
  setStateData() {
    let nowMoment = moment();
    this.setState({
      date: nowMoment.format('YYYY年MM月DD日'),
      time: nowMoment.format('hh:mm:ss a'),
      weekDay: this.formatWeekDay(nowMoment.weekday())
    })
  }
  formatWeekDay(weekday) {
    let weekDays = {
      1: '一', 
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
      0: '天',
    }
    return weekDays[weekday]
  }
  render() {
    return (
      <div className="weatherTitle">
        <div className="location">上海 - 胶州路</div>
        <div className="date">{this.state.date} 星期{this.state.weekDay}</div>
        <div>{this.state.time}</div>
      </div>
    )
  }
}

export default WeatherTitle;