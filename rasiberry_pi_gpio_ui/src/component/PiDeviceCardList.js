import React from 'react';
import PiDeviceCard from './PiDeviceCard'
import ServiceUrls from '../utils/ServiceUrls'
import axios from 'axios';
class PiDeviceCardList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      piDeviceList: []
    }
    this.getDeviceList = this.getDeviceList.bind(this);
  }
  componentDidMount() {
    this.getDeviceList();
  }
  getDeviceList() {
    return new Promise(resolve => {
      axios.get(ServiceUrls.getPiDevices)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let piDeviceList = responseData.data;
          this.setState({
            'piDeviceList': piDeviceList
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }
  render() {
    var cardList = [];
    this.state.piDeviceList.forEach((piDevice, idx) => {
    let card = <PiDeviceCard refreshPIGPIOStatus={this.props.refreshPIGPIOStatus} piDeviceInfo={piDevice} key={piDevice.id} refreshCardList={this.getDeviceList}></PiDeviceCard>
      cardList.push(card)
    })
    return (
      <div className={"pi_device_card_list"}>
        {cardList}
      </div>
    )
  }
}

export default PiDeviceCardList;