import {COLLAPSE, UNCOLLAPSE} from './actiontypes';
// 导出并且定义reducer
const initialState = {
  collapse: false
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case COLLAPSE:
      return Object.assign({}, state, {
        collapse: action.value
      })
    case UNCOLLAPSE:
      return Object.assign({}, state, {
        collapse: action.value
      })
    default:
      return state;
  }
}