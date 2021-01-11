export const Initialize = () => {
  return (dispatch, getState) => {  
    dispatch( {
        type: 'SELLING_INITIALIZE',
    })
    return Promise.resolve()
  }  
}

export const SetSellingStep = data => {
  const step = data;
  return (dispatch, getState) => {  
    dispatch( {
        type: 'SET_SELLING_STEP',
        step
    })
    return Promise.resolve()
  }  
}

export const SetPhotos = data => {
  const photos = data;
  return (dispatch, getState) => {  
    dispatch( {
        type: 'SET_SELLING_PHOTOS',
        photos
    })
    return Promise.resolve()
  }
}

export const SetUploadedCars = data => {
  const photos = data;
  return (dispatch, getState) => {
    dispatch( {
      type: 'SET_UPLOADED_CARS',
      photos
    })
    return Promise.resolve()
  }
}

export const SetFeaturedCar = data => {
  const photo = data;
  return (dispatch, getState) => {
    dispatch( {
      type: 'SET_FEATURED_CAR',
      photo
    })
    return Promise.resolve()
  }
}

export const SetCarDetails = data => {
  const details = data;
  return (dispatch, getState) => {
    dispatch( {
      type: 'SET_CAR_DETAILS',
      details
    })
    return Promise.resolve()
  }
}

export const SetUserDetails = data => {
  const details = data;
  return (dispatch, getState) => {
    dispatch( {
      type: 'SET_USER_DETAILS',
      details
    })
    return Promise.resolve()
  }
}

export const SetSellingAuthStep = data => {
  const step = data;
  return (dispatch, getState) => {  
    dispatch( {
        type: 'SET_SELLING_AUTH_STEP',
        step
    })
    return Promise.resolve()
  }  
}

export const SetSellingAuthMethod = data => { 
  const method = data;
  return (dispatch, getState) => {  
    dispatch( {
        type: 'SET_SELLING_AUTH_METHOD',
        method
    })
    return Promise.resolve()
  }   
}

export const SetSellingAuthIdentity = data => { 
  const identity = data;
  return (dispatch, getState) => {  
    dispatch( {
        type: 'SET_SELLING_AUTH_IDENTITY',
        identity
    })
    return Promise.resolve()
  }   
}


export const SetSellingAuthPassword = data => {
  const password = data;
  return (dispatch, getState) => {
    dispatch( {
      type: "SET_SELLING_AUTH_PASSWORD",
      password
    })
    return Promise.resolve()
  }
}

export const SetSellingAuthDetails = data => {
  const details = data;
  return (dispatch, getState) => {
    dispatch( {
      type: "SET_SELLING_AUTH_DETAILS",
      details
    })
    return Promise.resolve()
  }
}