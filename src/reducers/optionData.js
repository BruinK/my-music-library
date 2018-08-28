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
          optionsMusicKind: action.kind,
          activeToolList: [...activeTemp]
        };
      }
      if (action.kind === 2) {
        return {
          ...state,
          optionMusicOrder: newState.recommendListIdx[action.id],
          optionsMusicKind: action.kind,
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
    case ActionTypes.CHANGEMULTIPLEMARK: {
      const newState = { ...state };
      //  1 多选
      if (action.kind === 1) {
        return {
          ...state,
          activeToolList: [4],
          deleteList: []
        };
      }
      // 0单选
      if (action.kind === 0) {
        return {
          ...state,
          optionMusicOrder: newState.deleteList.pop(),
          deleteList: []
        };
      }
      return state;
    }
    case ActionTypes.ADDDELETEID: {
      const newState = { ...state };
      const deltemp = newState.deleteList;
      let mark = 0;
      // 1 来自 myList
      if (action.kind === 1) {
        const idTemp = newState.myListIdx[action.id];
        const order = deltemp.indexOf(idTemp);
        if (order !== -1) {
          deltemp.splice(order, 1);
        } else if (deltemp.length !== 5) {
          deltemp.push(idTemp);
        }
      }
      // 2 来自 recommend List
      if (action.kind === 2) {
        const idTemp = newState.recommendListIdx[action.id];
        const order = deltemp.indexOf(idTemp);
        if (order !== -1) {
          deltemp.splice(order, 1);
        } else if (deltemp.length !== 5) {
          deltemp.push(idTemp);
        }
      }

      deltemp.forEach(item => {
        newState.recommendListIdx.forEach(it => {
          if (item === it) mark = 1;
        });
      });
      if (mark === 1) {
        return {
          ...state,
          deleteList: [...deltemp],
          activeToolList: []
        };
      }
      return {
        ...state,
        deleteList: [...deltemp],
        activeToolList: [4]
      };
    }
    case ActionTypes.RENAME: {
      return {
        ...state,
        myList: {
          ...state.myList,
          [action.id]: {
            ...state.myList[action.id],
            name: action.data
          }
        }
      };
    }
    case ActionTypes.DELETEMUSIC: {
      const newState = { ...state };
      console.log('​optionData -> newState.deleteList', newState.deleteList);
      if (newState.deleteList.length === 0) {
        const order = newState.myListIdx.indexOf(newState.optionMusicOrder);
        newState.myListIdx.splice(order, 1);
        return {
          ...state,
          optionMusicOrder: -1,
          myListIdx: [...newState.myListIdx]
        };
      }
      newState.deleteList.forEach(item => {
        const orderTem = newState.myListIdx.indexOf(item);
        if (orderTem !== -1) {
          newState.myListIdx.splice(orderTem, 1);
        }
      });
      return {
        ...state,
        myListIdx: [...newState.myListIdx],
        deleteList: []
      };
    }
    default:
      return state;
  }
}
