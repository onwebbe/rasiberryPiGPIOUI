import React from 'react';
import PiGPIO from '../component/PiGPIO'
import PiDeviceCardList from '../component/PiDeviceCardList'
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
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
        <Row gutter={16}>
          <Col xs={24} sm={24} md={14} lg={14}>
            <PiDeviceCardList refreshPIGPIOStatus={this.refreshPIGPIOStatus}></PiDeviceCardList>
          </Col>
          <Col xs={24} sm={24} md={10} lg={10}>
            <PiGPIO onRef={this.onRef}></PiGPIO>
          </Col>
        </Row>
      </div>
    )
  }
}

export default GPIOOverview;