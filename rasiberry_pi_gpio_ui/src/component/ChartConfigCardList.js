import React from 'react';
import ChartConfigCard from './ChartConfigCard'
import ServiceUrls from '../utils/ServiceUrls'
import axios from 'axios';
import {Row, Col, Modal, Button} from 'antd';
import AddChartDialogContent from './AddChartDialogContent'
class ChartConfigCardList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      displayAddUpdateDialog: false,
      chartList: []
    }
    this.getChartList = this.getChartList.bind(this);
    this.cancelUpdateChartConfig = this.cancelUpdateChartConfig.bind(this);
    this.confirmUpdateChartConfig = this.confirmUpdateChartConfig.bind(this);
    this.addChartConfig = this.addChartConfig.bind(this);
    this.addNewChart = this.addNewChart.bind(this);
    this.getDialogContent = this.getDialogContent.bind(this);
    this.getParentContent = this.getParentContent.bind(this);
  }
  componentDidMount() {
    this.getChartList();
  }
  getParentContent() {
    return this;
  }
  getDialogContent(dialogContent) {
    this.dialogContent = dialogContent;
  }
  getChartList() {
    return new Promise(resolve => {
      axios.get(ServiceUrls.getHistoryChartList)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          let chartList = responseData.data;
          this.setState({
            'chartList': chartList
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }
  addNewChart(data) {
    return new Promise(resolve => {
      axios.post(ServiceUrls.addHistoryChartList, data)
      .then((response) => {
        var responseData = response.data;
        if (responseData.success == true || responseData.success == 'true') {
          this.getChartList();
          this.setState({
            displayAddUpdateDialog: false
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }
  addChartConfig() {
    this.setState({displayAddUpdateDialog: true});
  }
  async confirmUpdateChartConfig() {
    if (this.dialogContent) {
      var data = this.dialogContent.state.selectedValues;
      await this.addNewChart(data);
      await this.getChartList();
    }
    this.setState({displayAddUpdateDialog: false});
  }
  cancelUpdateChartConfig() {
    this.setState({displayAddUpdateDialog: false});
  }
  render() {
    var cardList = [];
    this.state.chartList.forEach((chartConfig, idx) => {
    let card = <Col span="12"><ChartConfigCard getParentContent={this.getParentContent} key={chartConfig.id} chartConfig={chartConfig}></ChartConfigCard></Col>
      cardList.push(card)
    })
    return (
      <div className={"history_chart_card_list"}>
        <div style={{marginBottom: 20, textAlign: 'left'}}><Button type="primary" onClick={this.addChartConfig}>新图表</Button></div>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
          {cardList}
        </Row>
        <Modal
          title="图表设置"
          visible={this.state.displayAddUpdateDialog}
          onOk={this.confirmUpdateChartConfig}
          onCancel={this.cancelUpdateChartConfig}
        >
          <AddChartDialogContent getDialogContent={this.getDialogContent}></AddChartDialogContent>
        </Modal>
      </div>
    )
  }
}

export default ChartConfigCardList;