import { normalize } from 'normalizr';
import * as schemas from '../schema/index';
import * as ActionTypes from '../const/ActionTypes';

export function showToolBar() {
  return {
    type: ActionTypes.SHOWTOOLBAR
  };
}

export function isShowTips(mark, data) {
  return {
    type: ActionTypes.ISSHOWTIPS,
    data,
    mark
  };
}

export function deleteMusic() {
  return {
    type: ActionTypes.DELETEMUSIC
  };
}
export function addDeleteId(id, kind) {
  return {
    type: ActionTypes.ADDDELETEID,
    id,
    kind
  };
}
export function reName(data, id) {
  return {
    type: ActionTypes.RENAME,
    data,
    id
  };
}

export function changeMultipleMark(kind) {
  return {
    type: ActionTypes.CHANGEMULTIPLEMARK,
    kind
  };
}
export function storeCutInfo(bmt, emt, id) {
  return {
    type: ActionTypes.STORECUTINFO,
    bmt,
    emt,
    id
  };
}

export function addOptionMusic(id, kind) {
  return {
    type: ActionTypes.ADDOPTIONMUSIC,
    id,
    kind
  };
}

export function addToolId(id) {
  return {
    type: ActionTypes.ADDTOOLID,
    id
  };
}

export function login(mid) {
  return {
    SERVER_API: {
      type: ActionTypes.LOGIN,
      endpoint: '/login',
      params: {
        mid
      },
      normailzerFun: response => normalize(response.data, schemas.PERSONINFO),
      OWN: true
    }
  };
}
export function fetchMyList(token) {
  return {
    SERVER_API: {
      type: ActionTypes.FETCHMYLIST,
      endpoint: '/music/my_list',
      params: {
        token
      },
      normailzerFun: response => normalize(response.data.list, schemas.LIST)
    }

  };
}

export function fetchRecommendList(token) {
  return {
    SERVER_API: {
      type: ActionTypes.FETCHRECOMMENDLIST,
      endpoint: '/music/recommend_list',
      params: {
        token
      },
      normailzerFun: response => normalize(response.data.list, schemas.LIST)
    }

  };
}
