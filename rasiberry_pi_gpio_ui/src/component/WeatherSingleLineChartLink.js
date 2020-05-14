import WeatherSingleLineChart from './WeatherSingleLineChart';
import {collapseSideBar, unCollapseSideBar} from '../store/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  state['renderer'] = ownProps.renderer;
  state['title'] = ownProps.title;
  state['piDeviceId'] = ownProps.piDeviceId;
  state['dataName'] = ownProps.dataName;
  state['isAsK'] = ownProps.isAsK;
  state['isCollapse'] = ownProps.isCollapse;
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCollapse: (collapsed, type) => {
      console.log('new:' + collapsed + ' ' + type);
      if (collapsed) {
        dispatch(collapseSideBar());
      } else {
        dispatch(unCollapseSideBar());
      }
    }
  }
}

const WeatherSingleLineChartLink = connect(mapStateToProps, mapDispatchToProps)(WeatherSingleLineChart)

export default WeatherSingleLineChartLink