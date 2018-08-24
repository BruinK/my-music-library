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
    default:
      return state;
  }
}
