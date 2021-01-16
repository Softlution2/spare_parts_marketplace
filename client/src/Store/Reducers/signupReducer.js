const initState = {
  accountType: null,
  email: "",
  phone: "",
  password: "",
  avatar: null,
};

const SignupReducer = (state = initState, action) => {
    switch (action.type) {
      case 'SIGNUP_INITIALIZE':
        return {
          ...initState
        }
      case 'SET_ACCOUNT_TYPE':
        return {
          accountType: action.data
        }
      case 'SET_EMAIL_ADDRESS':
        return {
          ...state,
          email: action.method,
        }
      case 'SET_PHONE_NUMBER':
        return {
          ...state,
          phone: action.method,
        }
      case "SET_PASSWORD":
        return {
          ...state,
          password: action.method,
        }
      case "SET_DETAILS":
        return {
          ...state,
          name: action.method.name,
          location: action.method.location,
        }
      case "SET_AVATAR":
        return {
          ...state,
          avatar: action.method
        }
      default:
          return state;
    }
}
export default SignupReducer