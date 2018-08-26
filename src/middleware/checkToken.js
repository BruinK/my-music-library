/* eslint-disable  */
  //  f (action.SERVER_API.params)
  // 缺失的参数是数组，这里得到的将是一个空数组；
  // 确实的参数是字符串，这里得到的将是一个undefined


  // Object.entries(action.SERVER_API.params)方法
  // 如果一个参数，得到一个数组嵌套一个数组，数组第0项为键，第一项为值
  // 如果多个参数，得到一个数组嵌套多个数组，数组第0项为键，第一项为值
let needParams = []; // 存放action
let paramsName = []; // 存放缺失键名
export default store => next => action => {
  if (!action.SERVER_API) {
    return next(action);
  }
  function callBak(data) {
      while (needParams.length !== 0) {
        getParams(data.data, paramsName.shift(), needParams.shift())
      }
  }
  // OWN 提供者标记
  if (action.SERVER_API.OWN) {
      return next(
          {...action,
          SERVER_API:{
            ...action.SERVER_API,
            callBackArgument:callBak
        }}
    )
  }

  // 参数缺失判定： 有键 没有值的 都要拦截
  Object.entries(action.SERVER_API.params).forEach(item => {
    if (item[1] === undefined) {
        paramsName.push(item[0])
        needParams.push(action)
    }
})

function getParams(data, params, action) {
    Object.entries(data).forEach(item => {
        if(item[0] === params) {
            const paramsTemp = item[1];  
            return next({
                    ...action,
                    SERVER_API: {
                    ...action.SERVER_API,
                    params: {
                        ...action.SERVER_API.params,
                        [item[0]]: paramsTemp
                    }
            }
        })
    }
})}

};
