import MainLayout from './MainLayout';
import {collapseSideBar, unCollapseSideBar} from '../store/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
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

const MainLayoutLink = connect(mapStateToProps, mapDispatchToProps)(MainLayout)

export default MainLayoutLink