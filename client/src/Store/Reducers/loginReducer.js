var item = localStorage.getItem("login");

const initState = JSON.parse(item);

const UsersReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_LOGIN":
      localStorage.setItem("login", action.login);
      return {
        ...JSON.parse(action.login),
        success: true,
      };
    case "UPDATE_USER_INFO":
      localStorage.removeItem("login");
      localStorage.setItem("login", JSON.stringify(action.login));
      return {
        ...action.login,
        success: true,
      };
    case "CREATE_DELETE":
      localStorage.removeItem("login");
      return localStorage.getItem("login");
    default:
      return state;
  }
};
export default UsersReducer;
