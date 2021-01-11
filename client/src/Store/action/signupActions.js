export const Initialize = () => {
  return (dispatch, getState) => {  
    dispatch( {
        type: 'SIGNUP_INITIALIZE',
    })
    return Promise.resolve()
  }  
}

export const SetSignupStep = data => {
  const step = data;
  return (dispatch, getState) => {  
    dispatch( {
        type: 'SET_SIGNUP_STEP',
        step
    })
    return Promise.resolve()
  }  
}

export const SetVerifyMethod = data => { 
  const method = data;
  return (dispatch, getState) => {  
    dispatch( {
        type: 'SET_VERIFY_METHOD',
        method
    })
    return Promise.resolve()
  }   
}

export const SetEmailAddress = data => {
  const method = data;
  return (dispatch, getState) => {
    dispatch( {
      type: "SET_EMAIL_ADDRESS",
      method
    })
    return Promise.resolve()
  }
}

export const SetPhoneNumber = data => {
  const method = data;
  return (dispatch, getState) => {
    dispatch( {
      type: "SET_PHONE_NUMBER",
      method
    })
    return Promise.resolve()
  }
}

export const SetVerifyPassed = data => {
  const method = data;
  return (dispatch, getState) => {
    dispatch( {
      type: "OTP_VERIFY_SUCCESS",
      method
    })
    return Promise.resolve()
  }
}

export const SetPassword = data => {
  const method = data;
  return (dispatch, getState) => {
    dispatch( {
      type: "SET_PASSWORD",
      method
    })
    return Promise.resolve()
  }
}

export const SetDetails = data => {
  const method = data;
  return (dispatch, getState) => {
    dispatch( {
      type: "SET_DETAILS",
      method
    })
    return Promise.resolve()
  }
}

export const SetAvatar = data => {
  const method = data;
  return (dispatch, getState) => {
    dispatch( {
      type: "SET_AVATAR",
      method
    })
    return Promise.resolve()
  }
}