import React from 'react';
import { List, Avatar, Modal, Button, Input, notification } from 'antd';
import axios from 'axios';
import ServiceUrls from '../utils/ServiceUrls'
class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      deviceList : [
      ],
      piDeviceList: [],
      isShowAddNewDlg: false,
      isShowPiDeviceListDlg: false
    }
    this.getData = this.getData.bind(this);
    this.confirmAddNewDevice = this.confirmAddNewDevice.bind(this);
    this.cancelAddNewDevice = this.cancelAddNewDevice.bind(this);
    this.addNewDevice = this.addNewDevice.bind(this);
    this.onAddDialogNameChange = this.onAddDialogNameChange.bind(this);
    this.openPiDeviceDialog = this.openPiDeviceDialog.bind(this);
    this.closePiDeviceDialog = this.closePiDeviceDialog.bind(this);
  }
  componentDidMount() {
    // await this._getAllPerson();
    // await this._getPersonById(this.props.personId);
    this.getData()
  }
  getData() {
    return new Promise(resolve => {
      axios.get(ServiceUrls.getDeviceList)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let deviceList = responseData.data;
          this.setState({
            'deviceList': deviceList,
            'selectedDeviceInfo': null,
            'newDeviceName': ''
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }
  onAddDialogNameChange(evt) {
    this.setState({
      'newDeviceName': evt.target.value
    })
  }
  addNewDevice(evt, deviceId) {
    this.state.deviceList.forEach((device, idx) => {
      if (device.id === deviceId) {
        this.setState({
          selectedDeviceInfo: device,
          isShowAddNewDlg: true
        });
      }
    })
  }
  confirmAddNewDevice(evt) {
    var deviceId = this.state.selectedDeviceInfo.id;
    var url = ServiceUrls.createPiDevice;
    url = url.replace('<deviceId>', deviceId);
    axios.get(url, {
      params: {
        name: this.state.newDeviceName
      }})
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          notification['success']({
            message: '成功',
            description:
              '成功添加新的pi设备，设备号为' + responseData.data.id + '设备名称' + responseData.data.piDeviceName,
          });
          this.setState({
            isShowAddNewDlg: false
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  cancelAddNewDevice(evt) {
    this.setState({
      isShowAddNewDlg: false
    })
  }
  openPiDeviceDialog(evt, deviceId) {
    return new Promise(resolve => {
      this.setState({
        isShowPiDeviceListDlg: true
      });
      var url = ServiceUrls.getPiDevicesByDeviceId;
      url = url.replace('<deviceId>', deviceId);
      axios.get(url)
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
  closePiDeviceDialog(evt) {
    this.setState({
      isShowPiDeviceListDlg: false
    });
  }
  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <div className="deviceList" style={{marginTop: '15px'}}>
          <List
            itemLayout="horizontal"
            dataSource={this.state.deviceList}
            renderItem={item => (
              <List.Item
                actions={[
                  <a key="add_a_new_device" onClick={(evt) => { this.addNewDevice(evt, item.id)}}>创建一个设备</a>,
                  <a key="check_pi_devices" onClick={(evt) => { this.openPiDeviceDialog(evt, item.id)}}>查看这类设备</a>
                 ]}>
                <List.Item.Meta
                  avatar={<Avatar src={ServiceUrls.getDeviceImageUrl(item.id)} />}
                  title={item.deviceName}
                />
              </List.Item>
            )}
          />
          <Modal
            title="添加设备"
            visible={this.state.isShowAddNewDlg}
            onOk={(evt) => {this.confirmAddNewDevice(evt)}}
            onCancel={this.cancelAddNewDevice}
          >
            设备：{this.state.selectedDeviceInfo?this.state.selectedDeviceInfo.deviceName : ''}
            <Input placeholder='创建的Pi设备名称' onChange={this.onAddDialogNameChange}/>
          </Modal>
          <Modal
            title="查看设备列表"
            visible={this.state.isShowPiDeviceListDlg}
            onOk={(evt) => {this.closePiDeviceDialog(evt)}}
            onCancel={this.closePiDeviceDialog}
          >
           <List
            itemLayout="horizontal"
            dataSource={this.state.piDeviceList}
            renderItem={item => (
              <List.Item>
                <div style={{width: '100%', display: 'flex'}}>
                  <div>设备号：{item.id}</div>
                  <div style={{paddingLeft: 30}}>设备名：{item.piDeviceName}</div>
                </div>
              </List.Item>
            )}
          />
          </Modal>
      </div>
    );
  }
}

export default DeviceList;