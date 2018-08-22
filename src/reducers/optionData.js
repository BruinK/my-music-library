import * as ActionTypes from '../const/ActionTypes';
import { dataList } from './INIT_STATE';

export default function optionData(state = dataList, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUC: {
      return {
        ...state,
        personInfo: action.response.entities.personInfo,
        personInfoIdx: [action.response.result]
      };
    }
    case ActionTypes.FETCHMYLIST_SUC: {
      return {
        ...state,
        myList: action.response.entities.list,
        myListIdx: [...action.response.result]
      };
    }
    case ActionTypes.FETCHRECOMMENDLIST_SUC: {
      return {
        ...state,
        recommendList: action.response.entities.list,
        recommendListIdx: [...action.response.result]
      };
    }
    default:
      return state;
  }
}
