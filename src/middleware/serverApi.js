import axios from 'axios';

const API_DOMAIN = 'http://xly-wkop.xiaoniangao.cn';

/* eslint-disable  */
export default store => next => action => {
  if (!action.SERVER_API) {
    return next(action);
  }
  const {
    type,
    endpoint,
    params
  } = action.SERVER_API;


  if (typeof type !== 'string') {
    throw new Error('type shoudle be a string');
  }
  if (typeof endpoint !== 'string') {
    throw new Error('endpoint shoudle be a string');
  }
  if (typeof params !== 'object') {
    throw new Error('params shoudle be a object');
  }

  const { normailzerFun } = action.SERVER_API;

  next({
    type: `${type}_REQ`
  });

  return callServerApi(endpoint, params)
    .then(res => {
        // console.log('中间件1',res.data)
      const response = typeof (normailzerFun) !== 'undefined' ? normailzerFun(res.data) : res.data;
        // console.log('中间件2', response)
      next({
        type: `${type}_SUC`,
        response
      });
    }).catch(err => {
      next({
        type: `${type}_FAI`,
        errMsg: err.errMsg
      });
    });
};

const callServerApi = (endpoint, params) => new Promise((resolve, reject) => {
  axios({
    method: 'POST',
    url: API_DOMAIN + endpoint,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params
  }).then(res => {
    if (res.data.ret === 1) {
      return resolve(res);
    }
    return reject({
      errMsg: res.data.errMsg
    });
  }).catch(err => reject({
        errMsg: JSON.stringify(err)
            }));
});
