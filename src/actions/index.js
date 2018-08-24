import { normalize } from 'normalizr';
import * as schemas from '../schema/index';
import * as ActionTypes from '../const/ActionTypes';

export function showToolBar() {
  return {
    type: ActionTypes.SHOWTOOLBAR
  };
}

export function addOptionMusic(id) {
  return {
    type: ActionTypes.ADDOPTIONMUSIC,
    id
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
      normailzerFun: response => normalize(response.data, schemas.PERSONINFO)
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
