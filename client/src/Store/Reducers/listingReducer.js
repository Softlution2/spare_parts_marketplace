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
  itemsInCart: JSON.parse(localStorage.getItem("itemsInCart")) || [],
  searchQuery: {
    string: "",
    priceRange: null,
    category: null,
    make: null,
    model: null,
    year: null,
    brand: null,
    sortBy: {date: -1}
  },
};

const listingReducer = (state = initState, action) => {
  switch (action.type) {
    case "INITIALIZE_SUCCESS":
      return {
        ...state,
        searchQuery: { ...initState.searchQuery, ...action.searchQuery },
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
        isLoading: false,
      };
    case "GET_MY_LISTING_FAILED":
      return {
        ...initState,
      };
    case "ADD_TO_CART":
      const { itemsInCart } = state;
      itemsInCart.push(action.data);
      localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
      return {
        ...state,
        itemsInCart
      }
    case "UPDATE_CART":
      localStorage.setItem("itemsInCart", JSON.stringify(action.data));
      return {
        ...state,
        itemsInCart: action.data
      }
    case "SET_VISIBILITY_SUCCESS":
      const { listing_id, visibility } = action;
      const { listing } = state;
      const index = listing.findIndex(x => x._id === listing_id);
      listing[index]["hide"] = visibility;
      return {
        ...state,
        listing
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
    // case "SET_FAVOURITE_LISTING_SUCCESS":
    //   const data = action.data;
    //   const {similarListing, listing, favoriteListing} = state;
    //   let foundIndex = listing.findIndex((v) => v._id === data._id);
    //   if (foundIndex !== -1) {
    //     listing[foundIndex].favourite_users = data.favourite_users;
    //   }
    //   foundIndex = favoriteListing.findIndex((v) => v._id === data._id);
    //   if (foundIndex !== -1) {
    //     favoriteListing[foundIndex].favourite_users = data.favourite_users;
    //   }
    //   foundIndex = similarListing.findIndex((v) => v._id === data._id);
    //   if (foundIndex !== -1) {
    //     similarListing[foundIndex].favourite_users = data.favourite_users;
    //   }
    //   return {
    //     ...state,
    //     listing: listing,
    //     favoriteListing: favoriteListing,
    //     similarListing: similarListing
    //   };
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
