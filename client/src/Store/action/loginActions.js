export const LogInAc = (data) => {
  var login = JSON.stringify(data);
  return (dispatch, getState) => {
    dispatch({
      type: "CREATE_LOGIN",
      login,
    });
    return Promise.resolve();
  };
};
export const UpdateUserInfo = (data) => {
  var login = data;
  return (dispatch, getState) => {
    dispatch({
      type: "UPDATE_USER_INFO",
      login,
    });
    return Promise.resolve();
  };
};
