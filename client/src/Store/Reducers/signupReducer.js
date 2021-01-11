
const initState = {
  verifyMethod: null,
  signupStep: 0,
  verifyPassed: false,
  email: "",
  phone: "",
  password: "",
  name: "",
  location: "",
  avatar: null,
};

const SignupReducer = (state = initState, action) => {
    switch (action.type) {
      case 'SIGNUP_INITIALIZE':
        return {
          ...initState
        }
      case 'SET_VERIFY_METHOD':
        return {
          ...state,
          verifyMethod: action.method,
          success: true
        }
      case 'SET_SIGNUP_STEP':
        return {
          ...state,
          signupStep: action.step,
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
      case 'OTP_VERIFY_SUCCESS':
        return {
          ...state,
          verifyPassed: action.method
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