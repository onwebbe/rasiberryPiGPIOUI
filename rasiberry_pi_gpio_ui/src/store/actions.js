import {COLLAPSE, UNCOLLAPSE} from './actiontypes';

export function collapseSideBar() {
  return {type : COLLAPSE, value: true}
}

export function unCollapseSideBar() {
  return {type : UNCOLLAPSE, value: false}
}
