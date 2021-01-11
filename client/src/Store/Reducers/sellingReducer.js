const login = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : null;

const initState = {
  currentStep: 0,
  photos: [],
  uploadedPhotos: [],
  featuredPhoto: null,
  carDetails: {
    make: null,
    model: null,
    year: null,
    version: null,
    price: null,
    color: null,
    transmission: null,
    mileage: null,
    type: null,
    description: null,
    currency: "AUD",
    unit: "Kilometers",
    tags: [],
    options: [],
  },
  userDetails: {
    name: login ? login.name : "",
    phone: login && login.phone.length > 0 ? login.phone[0] : "",
    location: login ? login.location : "",
  },
  authStep: 0,
  authMethod: null,
  authIdentity: {
    email: null,
    phone: null,
  },
  authPassword: null,
  authDetails: {
    name: "",
    location: "",
  }
};

const SellingReducer = (state = initState, action) => {
    switch (action.type) {
      case 'SELLING_INITIALIZE':
        return {
          ...initState
        }
      case 'SET_SELLING_STEP':
        return {
          ...state,
          currentStep: action.step
        }
      case 'SET_SELLING_PHOTOS':
        return {
          ...state,
          photos: action.photos
        }
      case 'SET_UPLOADED_CARS':
        return {
          ...state,
          uploadedPhotos: action.photos
        }
      case 'SET_FEATURED_CAR':
        return {
          ...state,
          featuredPhoto: action.photo
        }
      case 'SET_CAR_DETAILS':
        return {
          ...state,
          carDetails: action.details
        }
      case 'SET_USER_DETAILS':
        return {
          ...state,
          userDetails: action.details
        }
      case 'SET_SELLING_AUTH_STEP':
        return {
          ...state,
          authStep: action.step
        }
      case 'SET_SELLING_AUTH_METHOD':
        return {
          ...state,
          authMethod: action.method
        }
      case 'SET_SELLING_AUTH_IDENTITY':
        return {
          ...state,
          authIdentity: action.identity,
        }
      case 'SET_SELLING_AUTH_PASSWORD':
        return {
          ...state,
          authPassword: action.password
        }
      case 'SET_SELLING_AUTH_DETAILS':
        return {
          ...state,
          authDetails: action.details
        }
      default:
          return state;
    }
}
export default SellingReducer