import { uiList } from './INIT_STATE';
import * as ActionTypes from '../const/ActionTypes';

export default function showUi(state = uiList, action) {
  switch (action.type) {
    case ActionTypes.SHOWTOOLBAR:
    {
      return state;
    }
    case ActionTypes.ADDTOOLID: {
      return {
        ...state,
        currentToolId: action.id
      };
    }
    case ActionTypes.CHANGEMULTIPLEMARK: {
      // 0 单选  1 多选
      return {
        ...state,
        isMultiple: action.kind
      };
    }
    case ActionTypes.ISSHOWTIPS: {
      return {
        ...state,
        isShowTips: action.mark,
        tipsContent: action.data
      };
    }
    default:
      return state;
  }
}
