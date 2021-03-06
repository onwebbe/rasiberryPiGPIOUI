import React from 'react';
import { Skeleton, Card, Avatar, Popover, List, Modal, Input, Popconfirm, message  } from 'antd';
import { EditOutlined, DownCircleOutlined, SettingOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import ServiceUrls from '../utils/ServiceUrls'
import axios from 'axios';

import ChangePinDialogContent from './ChangePinDialogContent' 
import DeviceFunctionContent from './DeviceFunctionContent'
import DeviceCardDeviceData from './DeviceCardDeviceData'

const { Meta } = Card;

class PiDevicerCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.performActions = this.performActions.bind(this);
    this.updateDevice = this.updateDevice.bind(this);
    this._updateDevice = this._updateDevice.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
    this._deleteDevice = this._deleteDevice.bind(this);
    this.cancelUpdateDevice = this.cancelUpdateDevice.bind(this);
    this.confirmUpdateDevice = this.confirmUpdateDevice.bind(this);
    this.actionMenuVisibleChange = this.actionMenuVisibleChange.bind(this);
    this.onPiDeviceNameChange = this.onPiDeviceNameChange.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);

    this.confirmUpdatePin = this.confirmUpdatePin.bind(this);
    this.cancelUpdatePin = this.cancelUpdatePin.bind(this);
    this.openUpdatePin = this.openUpdatePin.bind(this);
    this.moreMenuVisibleChange = this.moreMenuVisibleChange.bind(this);
    this.closeMoreMenu = this.closeMoreMenu.bind(this);
    this.onCardDataRef = this.onCardDataRef.bind(this);
    this.passToChildren = this.passToChildren.bind(this);
    this._getStatusColor = this._getStatusColor.bind(this);
    this.markDeviceAsRunning = this.markDeviceAsRunning.bind(this);
    this.markDeviceAsStopped = this.markDeviceAsStopped.bind(this);
    this.state = {
      piDeviceInfo: this.props.piDeviceInfo?this.props.piDeviceInfo:null,
      isShowUpdateNewDlg: false,
      isShowActionMenu: false,
      updateDeviceName: this.props.piDeviceInfo?this.props.piDeviceInfo.piDeviceName:'',
      isShowConfirmDeleteDlg: false,
      isShowUpdatePiDevicePin: false,
      isShowMoreMenu: false,
      deviceRunningStatus: ''   //'' nothing, 'running'/'stopped'
    }
  }
  componentDidMount() {
    // await this._getAllPerson();
    // await this._getPersonById(this.props.personId);
  }
  onCardDataRef(ref) {
    this.cardDataRef = ref;
  }
  passToChildren() {
    return this;
  }
  getData() {
    return new Promise(resolve => {
      var url = ServiceUrls.getPiDeviceById;
      url = url.replace('<piDeviceId>', this.state.piDeviceInfo.id);
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let piDeviceInfo = responseData.data;
          this.setState({
            piDeviceInfo: piDeviceInfo
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }
  performActions(evt, key, piDeviceId) {
    if (piDeviceId == null) {
      return;
    }
    var self = this;
    switch(key){
      case 'update':
        self.updateDevice(piDeviceId);
        break;
      case 'delete':
        self.deleteDevice(piDeviceId)
        break;
    }
  }
  updateDevice(piDeviceId) {
    this.setState({
      isShowUpdateNewDlg: true,
      isShowActionMenu: false
    })
  }
  _updateDevice(piDeviceId) {
    return new Promise(resolve => {
      if (piDeviceId == null) {
        resolve();
      }
      var url = ServiceUrls.updatePiDevice;
      url = url.replace('<piDeviceId>', piDeviceId);
      axios.get(url, {
        params: {
          name: this.state.updateDeviceName
        }
      })
        .then((response) => {
          var responseData = response.data;
          if (responseData.success == true || responseData.success == 'true') {
            let piDeviceList = responseData.data;
            this.setState({
              'piDeviceList': piDeviceList
            });
          }
          resolve();
        })
        .catch((error) => {
          console.log(error);
          resolve();
        })
    });
  }
  async confirmUpdateDevice(evt, name) {
    this.setState({
      isShowUpdateNewDlg: false
    });
    await this._updateDevice(this.state.piDeviceInfo?this.state.piDeviceInfo.id:null)
    this.getData();
  }
  cancelUpdateDevice(evt) {
    this.setState({
      isShowUpdateNewDlg: false
    })
  }
  async confirmDelete() {
    this.setState({
      isShowConfirmDeleteDlg: false
    })
    this._deleteDevice(this.state.piDeviceInfo.id);
    setTimeout(()=>{
      this.props.refreshCardList();
    }, 200)
    
  }
  cancelDelete() {
    this.setState({
      isShowConfirmDeleteDlg: false,
    })
  }
  deleteDevice(piDeviceId) {
    this.setState({
      isShowConfirmDeleteDlg: true,
      isShowActionMenu: false
    })
  }
  _deleteDevice(piDeviceId) {
    return new Promise(resolve => {
      var url = ServiceUrls.deletePiDevice;
      url = url.replace('<piDeviceId>', piDeviceId);
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
        }
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
      })
    });
  }
  onPiDeviceNameChange(evt) {
    this.setState({
      'updateDeviceName': evt.target.value
    })
  }
  actionMenuVisibleChange(visible) {
    this.setState({
      isShowActionMenu: visible
    })
  }

  openUpdatePin() {
    this.setState({
      isShowUpdatePiDevicePin: true
    })
  }
  confirmUpdatePin() {
    this.setState({
      isShowUpdatePiDevicePin: false
    })
  }
  cancelUpdatePin() {
    this.setState({
      isShowUpdatePiDevicePin: false
    })
  }
  moreMenuVisibleChange(visible) {
    this.setState({
      isShowMoreMenu: visible
    });
  }
  closeMoreMenu() {
    this.setState({
      isShowMoreMenu: false
    });
  }
  markDeviceAsStopped() {
    this.setState({
      deviceRunningStatus: 'stopped'
    })
  }
  markDeviceAsRunning() {
    this.setState({
      deviceRunningStatus: 'running'
    })
  }
  _getStatusColor() {
    switch(this.state.deviceRunningStatus) {
      case 'stopped':
        return 'red';
      case 'running':
        return 'green';
    }
  }
  render() {
    const actions = [{
      name: '修改Pi设备',
      key: 'update',
      icon: <FormOutlined key="update" />
    }, {
      name: '删除该设备',
      key: 'delete',
      icon: <a href="#"><DeleteOutlined key="delete" /></a>
    }]
    const content = (
      <div>
        <List
          dataSource={actions}
          renderItem={action => (
            <List.Item>
              <a onClick={(evt)=>{this.performActions(evt, action.key, this.state.piDeviceInfo?this.state.piDeviceInfo.id:null)}}>{action.icon}&nbsp;&nbsp;{action.name}</a>
            </List.Item>
          )}/>
      </div>
    );

    const moreMenuContent = <DeviceFunctionContent passToChildren={this.passToChildren} refreshPIGPIOStatus={this.props.refreshPIGPIOStatus} closePopoverFunction={this.closeMoreMenu} deviceInfo={this.state.piDeviceInfo}></DeviceFunctionContent>
    var deviceDescription = <div>
      {this.state.piDeviceInfo?this.state.piDeviceInfo.piDeviceName:''}
      <span style={{paddingLeft: 10}}></span>
      <span style={{display: 'inline-block', width: 10, height: 10, borderRadius: 5, backgroundColor: this._getStatusColor()}}></span>
    </div>
    return (
      <div style={{display: 'inline-block', padding: 5 }}>
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" onClick={this.openUpdatePin}/>,
            <Popover 
              content={content} 
              trigger="click"
              visible={this.state.isShowActionMenu}
              onVisibleChange={this.actionMenuVisibleChange}>
              <EditOutlined key="edit" />
            </Popover>,
            <Popover 
              content={moreMenuContent}
              trigger="click"
              visible={this.state.isShowMoreMenu}
              onVisibleChange={this.moreMenuVisibleChange}>
              <DownCircleOutlined key="ellipsis" />
            </Popover>,
          ]}
        >
          <Skeleton loading={false} avatar active>
            <Meta
              avatar={
                <Avatar src={this.state.piDeviceInfo?ServiceUrls.getDeviceImageUrl(this.state.piDeviceInfo.deviceID):''} />
              }
              title={this.state.piDeviceInfo?this.state.piDeviceInfo.piDeviceName:''}
              description={deviceDescription}
            />
            <div style={{width: '100%', textAlign: 'left'}}>
              <DeviceCardDeviceData onCardDataRef={this.onCardDataRef} piDeviceInfo={this.state.piDeviceInfo}></DeviceCardDeviceData>
            </div>
          </Skeleton>
        </Card>
        <Modal
          title="更改设备"
          visible={this.state.isShowUpdateNewDlg}
          onOk={(evt) => {this.confirmUpdateDevice(evt)}}
          onCancel={this.cancelUpdateDevice}
        >
          设备号：{this.state.piDeviceInfo?this.state.piDeviceInfo.id : ''}
            <Input placeholder='更改的Pi设备名称' onChange={this.onPiDeviceNameChange} value={this.state.updateDeviceName}/>
        </Modal>
        <Modal
          title="确认删除设备？"
          visible={this.state.isShowConfirmDeleteDlg}
          onOk={(evt) => {this.confirmDelete(evt)}}
          onCancel={this.cancelDelete}
        >
          <div>确认删除以下设备？</div>
          设备号：{this.state.piDeviceInfo?this.state.piDeviceInfo.id : ''}
        </Modal>
        <Modal
          title="插入针脚"
          visible={this.state.isShowUpdatePiDevicePin}
          onOk={this.confirmUpdatePin}
          onCancel={this.cancelUpdatePin}
        >
          <ChangePinDialogContent piDevicePinList={this.state.piDeviceInfo?this.state.piDeviceInfo.pinList:[]}></ChangePinDialogContent>
        </Modal>
      </div>
    )
  }
}

export default PiDevicerCard;