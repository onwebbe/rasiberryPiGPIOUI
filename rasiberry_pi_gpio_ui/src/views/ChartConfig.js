import React from 'react';
import ChartConfigCardList from '../component/ChartConfigCardList'
import {Button} from 'antd';
class ChartConfig extends React.Component {
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
      <div className={"manage_chart"}>
        <ChartConfigCardList></ChartConfigCardList>
      </div>
    )
  }
}

export default ChartConfig;