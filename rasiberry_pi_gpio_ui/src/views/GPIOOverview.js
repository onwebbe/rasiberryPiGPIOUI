import React from 'react';
import PiGPIO from '../component/PiGPIO'
import { PlusOutlined } from '@ant-design/icons';

class GPIOOverview extends React.Component {
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
      <div className={"view_GPIOOverview"}>
        <PiGPIO></PiGPIO>
      </div>
    )
  }
}

export default GPIOOverview;