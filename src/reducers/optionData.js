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
    case ActionTypes.ADDOPTIONMUSIC: {
      const newState = { ...state };
      let activeTemp = [];
      // 如果kind为1 来自myList 2 来自recommendList
      if (action.kind === 1) {
        const orderTem = newState.myListIdx[action.id];
        if (newState.myList[orderTem].plp) {
          activeTemp = [0, 2, 3, 4];
        } else {
          activeTemp = [0, 1, 2, 3, 4];
        }
        return {
          ...state,
          optionMusicOrder: newState.myListIdx[action.id],
          optionNusicKind: action.kind,
          activeToolList: [...activeTemp]
        };
      }
      if (action.kind === 2) {
        return {
          ...state,
          optionMusicOrder: newState.recommendListIdx[action.id],
          optionNusicKind: action.kind,
          activeToolList: [0]
        };
      }
      return state;
    }
    case ActionTypes.STORECUTINFO: {
      return {
        ...state,
        myList: {
          ...state.myList,
          [action.id]: {
            ...state.myList[action.id],
            bmt: action.bmt,
            emt: action.emt
          }
        }
      };
    }
    default:
      return state;
  }
}
