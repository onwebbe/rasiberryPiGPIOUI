import React from 'react';
import { Card, Row, Col, Modal, Button, Popover} from 'antd';
import AddChartDialogContent from './AddChartDialogContent'
import ServiceUrls from '../utils/ServiceUrls'
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ServiceURLs from '../utils/ServiceUrls';

class ChartConfigCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      displayAddUpdateDialog: false,
      isShowActionMenu: false
    }
    console.log(this.props);
    this.cancelUpdateChartConfig = this.cancelUpdateChartConfig.bind(this);
    this.confirmUpdateChartConfig = this.confirmUpdateChartConfig.bind(this);
    this.updateChartConfig = this.updateChartConfig.bind(this);
    this.getDialogContent = this.getDialogContent.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.deleteChartConfig = this.deleteChartConfig.bind(this);
    this.actionMenuVisibleChange = this.actionMenuVisibleChange.bind(this);
    this.deleteChartConfigService = this.deleteChartConfigService.bind(this);
  }
  componentDidMount() {
    // await this._getAllPerson();
    // await this._getPersonById(this.props.personId);
  }
  actionMenuVisibleChange(visible) {
    this.setState({
      isShowActionMenu: visible
    })
  }
  getDialogContent(dialogContent) {
    this.dialogContent = dialogContent;
  }
  deleteChartConfig() {
    
  }
  deleteChartConfigService() {
    return new Promise(resolve => {
      var url = ServiceURLs.deleteHistoryChart;
      url = url.replace('<chartId>', this.props.chartConfig.id);
      axios.get(url)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          this.props.getParentContent().getChartList();
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }
  updateConfig(data) {
    return new Promise(resolve => {
      var url = ServiceUrls.updateHistoryChartList;
      url = url.replace('<chartId>', this.props.chartConfig.id);
      axios.post(url, data)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          resolve();
        }
      })
      .catch((error) => {
        console.log(error);
        resolve();
      })
    });
  }
  updateChartConfig() {
    this.setState({displayAddUpdateDialog: true});
  }
  async confirmUpdateChartConfig() {
    if (this.dialogContent) {
      var data = this.dialogContent.state.selectedValues;
      await this.updateConfig(data);
      this.props.getParentContent().getChartList();
    }
    this.setState({displayAddUpdateDialog: false});
  }
  cancelUpdateChartConfig() {
    this.setState({displayAddUpdateDialog: false});
  }
  render() {
    var chartConfig = this.props.chartConfig;
    var deleteYesNoContent = <div>
      <p>是否要删除？</p>
      <Button danger onClick={this.deleteChartConfigService}>删除</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button type="primary" onClick={()=> {
        this.setState({
          isShowActionMenu: false
        })
      }}>不删</Button>
    </div>;
    return (
        <div style={{ width: '100%'}}>
          <Card title={chartConfig.title} style={{ width: '100%'}}
            actions={[
              <Button type='link' icon={<EditOutlined />} onClick={this.updateChartConfig}>编辑</Button>,
              <Popover 
                content={deleteYesNoContent} 
                trigger="click"
                visible={this.state.isShowActionMenu}
                onVisibleChange={this.actionMenuVisibleChange}>
                <Button type='link' icon={<DeleteOutlined />} danger>删除</Button>,
              </Popover>
            ]}
            >
            <Row style={{textAlign: 'left'}}>
              <Col span={12}>PI设备号：{chartConfig.piDeviceID}</Col>
              <Col span={12}>数据名称： {chartConfig.deviceDataName}</Col>
              <Col span={12}>单位： {chartConfig.unit}</Col>
              <Col span={12}>显示类型： {chartConfig.displayType}</Col>
            </Row>
          </Card>
          <Modal
            title="图表设置"
            visible={this.state.displayAddUpdateDialog}
            onOk={this.confirmUpdateChartConfig}
            onCancel={this.cancelUpdateChartConfig}
          >
          <AddChartDialogContent getDialogContent={this.getDialogContent} chartConfig={chartConfig}></AddChartDialogContent>
          </Modal>
      </div>
    )
  }
}

export default ChartConfigCard;