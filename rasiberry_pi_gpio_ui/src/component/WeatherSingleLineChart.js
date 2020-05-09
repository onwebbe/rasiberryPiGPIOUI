import React, { PureComponent } from 'react';
import * as echarts from 'echarts';
import 'zrender/lib/svg/svg';
import ServiceUrls from '../utils/ServiceUrls';
import axios from 'axios';
// import throttle from '../../utils/throttle'; // 一个节流函数
/*
 * require property:
 * 1. title
 * 2. piDeviceId
 * 3. dataName
*/
export default class WeatherSingleLineChart extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.getData = this.getData.bind(this);
        this.state = {
          width: '100%',
          height: '100%',
          chartOption: {
            title: {
              text: this.props.title ? this.props.title : '', //'当日光照历史图',
              textStyle: {
                color: '#fff'
              },
              left: 'center',
              top: 10
            },
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data:   [],
                type: 'line',
                smooth: true
            }]
          }
        };
        this.chart = null;
    }
    /*
        注意：
            虽然在 componentDidMount 中组件已经被装配，
            但是如果设置容器宽高为百分比的值，那么容器的 clientWidth 和 clientHeight 有可能还处于计算中
            这个时候如果在容器中实例化 echarts，echarts 获得的 clientWidth 和 clientHeight 不一定是我们预期的，
            因此这里使用了定时器延迟实例化，也可以提前计算出像素之后 赋值给 width、height，这样不是百分比就没有问题
    */
    async componentDidMount() {
        console.log('did mount');
        // 初始化图表
        await this.initChart(this.el);
        // 将传入的配置(包含数据)注入
        // 监听屏幕缩放，重新绘制 echart 图表
        // window.addEventListener('resize', throttle(this.resize, 100));
        this.getData();
    }
    getData() {
      return new Promise((resolve, reject) => {
        var url = ServiceUrls.getSingleLineChartData;
        url = url.replace('<piDeviceId>', this.props.piDeviceId);
        url = url.replace('<dataName>', this.props.dataName);
        axios.get(url)
        .then((response) => {
          var responseData = response.data;
          if (responseData.success == true || responseData.success == 'true') {
            let data = responseData.data;
            var originalData = this.state.chartOption;
            var categoryData = data.category;
            var dataData = data.data;
            originalData.xAxis.data = categoryData;
            originalData.series[0].data = dataData;
            this.setOption(originalData);
          }
        })
        .catch((error) => {
          console.log(error);
        })
      });
    }
    componentDidUpdate() {
        // 每次更新组件都重置
        this.setOption(this.props.option);
    }
    componentWillUnmount() {
        // 组件卸载前卸载图表
        this.dispose();
    }
    render() {
        const { width, height } = this.state;
 
        return (
            <div
                className="default-chart"
                ref={el => (this.el = el)}
                style={{ width, height }}
            />
        );
    }
    initChart = el => {
        // renderer 用于配置渲染方式 可以是 svg 或者 canvas
        const renderer = this.props.renderer || 'canvas';
        console.log(renderer);
 
        return new Promise(resolve => {
            setTimeout(() => {
                this.chart = echarts.init(el, null, {
                    renderer,
                    width: 'auto',
                    height: '200px'
                });
                resolve();
            }, 0);
        });
    };
    setOption = option => {
        if (!this.chart) {
            return;
        }
 
        const notMerge = this.props.notMerge;
        const lazyUpdate = this.props.lazyUpdate;
 
        this.chart.setOption(option, notMerge, lazyUpdate);
    };
    dispose = () => {
        if (!this.chart) {
            return;
        }
 
        this.chart.dispose();
        this.chart = null;
    };
    resize = () => {
        this.chart && this.chart.resize();
    };
    getInstance = () => {
        return this.chart;
    };
}