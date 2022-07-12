export const promiseDispatch = (dispatch, action) => new Promise(resolve => {
    dispatch({ ...action, callback: resolve });
  })
  