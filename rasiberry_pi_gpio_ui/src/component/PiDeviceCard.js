import React from 'react';
import { Skeleton, Card, Avatar, Popover, List, Modal, Input, Popconfirm, message  } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import ServiceUrls from '../utils/ServiceUrls'
import axios from 'axios';

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
    this.state = {
      piDeviceInfo: this.props.piDeviceInfo?this.props.piDeviceInfo:null,
      isShowUpdateNewDlg: false,
      isShowActionMenu: false,
      updateDeviceName: this.props.piDeviceInfo?this.props.piDeviceInfo.piDeviceName:'',
      isShowConfirmDeleteDlg: false
    }
  }
  componentDidMount() {
    // await this._getAllPerson();
    // await this._getPersonById(this.props.personId);
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
    return (
      <div style={{display: 'inline-block', padding: 20 }}>
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <Popover 
              content={content} 
              trigger="click"
              visible={this.state.isShowActionMenu}
              onVisibleChange={this.actionMenuVisibleChange}>
              <EllipsisOutlined key="ellipsis" />
            </Popover>
            ,
          ]}
        >
          <Skeleton loading={false} avatar active>
            <Meta
              avatar={
                <Avatar src={this.state.piDeviceInfo?ServiceUrls.getDeviceImageUrl(this.state.piDeviceInfo.deviceID):''} />
              }
              title={this.state.piDeviceInfo?this.state.piDeviceInfo.piDeviceName:''}
              description={this.state.piDeviceInfo?this.state.piDeviceInfo.piDeviceName:''}
            />
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
      </div>
    )
  }
}

export default PiDevicerCard;