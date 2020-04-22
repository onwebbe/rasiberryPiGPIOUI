import React from 'react';
import PiGPIO from '../component/PiGPIO'
import PiDeviceCardList from '../component/PiDeviceCardList'
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
class GPIOOverview extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
    }
    this.onRef = this.onRef.bind(this);
    this.refreshPIGPIOStatus = this.refreshPIGPIOStatus.bind(this);
  }
  componentDidMount() {
  }
  onRef(ref) {
    this.piGPIO = ref;
  }
  refreshPIGPIOStatus() {
    this.piGPIO.updatePiStatus();
  }
  render() {
    return (
      <div className={"view_GPIOOverview"}>
        <PiGPIO onRef={this.onRef}></PiGPIO>
        <PiDeviceCardList refreshPIGPIOStatus={this.refreshPIGPIOStatus}></PiDeviceCardList>
      </div>
    )
  }
}

export default GPIOOverview;