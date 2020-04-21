import React from 'react';
import DeviceList from '../component/DeviceList'

class ManagePiDevice extends React.Component {
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
      <div className={"manage_pi_device"}>
        <DeviceList></DeviceList>
      </div>
    )
  }
}

export default ManagePiDevice;