// import initState1 from '../../softdata.json';
const initState = {
  homeListing: [],
  listing: [],
  maxPrice: 0,
  minPrice: 0,
  makeList: [],
  modelList: [],
  brandList: [],
  isLoading: false,
  searchQuery: {
    string: "",
    priceRange: null,
    make: null,
  },
};

const listingReducer = (state = initState, action) => {
  switch (action.type) {
    case "INITIALIZE_SUCCESS":
      console.log(action.searchQuery);
      return {
        ...state,
        searchQuery: action.searchQuery,
        listing: action.listings,
        maxPrice: action.maxPrice,
        minPrice: action.minPrice,
        makeList: action.makeList,
        modelList: action.modelList,
        brandList: action.brandList,
        isLoading: false,
      };
    case "INITIALIZE_FAILED":
      return {
        ...initState,
      };
    case "GET_HOME_LISTING_SUCCESS":
      return {
        ...state,
        homeListing: action.listing,
        isLoading: false,
      };
    case "GET_HOME_LISTING_FAILED":
      return {
        ...state,
        homeListing: []
      };
    case "GET_MY_LISTING_SUCCESS":
      return {
        ...state,
        listing: action.listings,
        maxPrice: action.maxPrice,
        minPrice: action.minPrice,
        maxMileage: action.maxMileage,
        minMileage: action.minMileage,
        maxYear: action.maxYear,
        minYear: action.minYear,
        transmissionList: action.transmissionList,
        makeList: action.makeList,
        colorList: action.colorList,
        isLoading: false,
      };
    case "GET_MY_LISTING_FAILED":
      return {
        ...initState,
      };
    case "GET_MY_FAVORITES_SUCCESS":
      return {
        ...state,
        favoriteListing: action.listings,
        isLoading: false,
      };
    case "GET_MY_FAVORITES_FAILED":
      return {
        ...state,
        favoriteListing: [],
        isLoading: false,
      };
    case "GET_ALL_LISTING_SUCCESS":
      return {
        ...state,
        listing: action.listing,
        isLoading: false,
      };
    case "FILTER_LISTING_SUCCESS":
      return {
        ...state,
        listing: action.listings,
        isLoading: false,
      };
    case "FILTER_LISTING_FAILED":
      return {
        ...state,
        listing: [],
        isLoading: false,
      };
    case "SET_FAVOURITE_LISTING_SUCCESS":
      const data = action.data;
      const {similarListing, listing, favoriteListing} = state;
      let foundIndex = listing.findIndex((v) => v._id === data._id);
      if (foundIndex !== -1) {
        listing[foundIndex].favourite_users = data.favourite_users;
      }
      foundIndex = favoriteListing.findIndex((v) => v._id === data._id);
      if (foundIndex !== -1) {
        favoriteListing[foundIndex].favourite_users = data.favourite_users;
      }
      foundIndex = similarListing.findIndex((v) => v._id === data._id);
      if (foundIndex !== -1) {
        similarListing[foundIndex].favourite_users = data.favourite_users;
      }
      return {
        ...state,
        listing: listing,
        favoriteListing: favoriteListing,
        similarListing: similarListing
      };
    case "SET_SIMILAR_LISTING":
      return {
        ...state,
        similarListing: action.data,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.data
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.data,
      };
    default:
      return state;
  }
};
export default listingReducer;
