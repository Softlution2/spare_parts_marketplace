import axios from "axios";

export const GetHomeListing = () => {
  return (dispatch, getState) => {
    axios
      .get("/api/listing/get-home")
      .then((res) => {
        const listing = res.data;
        dispatch({
          type: "GET_HOME_LISTING_SUCCESS",
          listing,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: "GET_HOME_LISTING_FAILED",
        });
      });
  };
};

export const Initialize = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_LOADING",
      data: true,
    });
    axios
      .post(`/api/listing/initialize`, {...data})
      .then((res) => {
        const {
          listings,
          maxPrice,
          minPrice,
          makeList,
          modelList,
          brandList
        } = res.data;
        let newBrandList = brandList.map((b) => { return { name: b } });
        dispatch({
          type: "INITIALIZE_SUCCESS",
          listings,
          maxPrice,
          minPrice,
          makeList,
          modelList,
          brandList: newBrandList
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "INITIALIZE_FAILED",
        });
      });
  };
};

export const GetMyListings = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_LOADING",
      data: true,
    });
    const login = getState().login;
    axios
      .get(`/api/listing/get-my-listing?user_id=${login._id}`)
      .then((res) => {
        const {
          listings,
          maxPrice,
          minPrice,
          maxMileage,
          minMileage,
          maxYear,
          minYear,
          makeList,
          transmissionList,
          colorList,
        } = res.data;
        dispatch({
          type: "GET_MY_LISTING_SUCCESS",
          listings,
          maxPrice,
          minPrice,
          maxMileage,
          minMileage,
          maxYear,
          minYear,
          makeList,
          transmissionList,
          colorList,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "GET_MY_LISTING_FAILED",
        });
      });
  };
};

export const GetMyFavorites = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_LOADING",
      data: true,
    });
    const login = getState().login;
    axios
      .get(`/api/listing/get-my-favorites?user_id=${login._id}`)
      .then((res) => {
        const { listings } = res.data;
        dispatch({
          type: "GET_MY_FAVORITES_SUCCESS",
          listings,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "GET_MY_FAVORITES_FAILED",
        });
      });
  };
};

export const FilterListing = (query) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_LOADING",
      data: true,
    });
    axios
      .post("/api/listing/search", { query })
      .then((res) => {
        const { listings } = res.data;
        dispatch({
          type: "FILTER_LISTING_SUCCESS",
          listings,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "FILTER_LISTING_FAILED",
        });
      });
  };
};

export const GetAllListing = () => {
  return (dispatch, getState) => {
    axios
      .get("/api/listing/get-all")
      .then((res) => {
        const listing = res.data;
        dispatch({
          type: "GET_ALL_LISTING_SUCCESS",
          listing,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: "GET_ALL_LISTING_FAILED",
        });
      });
  };
};

export const SetFavouriteListing = (e, listing_id) => {
  e.preventDefault();
  return (dispatch, getState) => {
    const login = getState().login;
    if (!login)
      return;
    axios
      .post("/api/listing/set-favourite", {
        listing_id: listing_id,
        user_id: login._id,
      })
      .then((res) => {
        dispatch({
          type: "SET_FAVOURITE_LISTING_SUCCESS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const SetLoading = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_LOADING",
      data,
    });
  };
};

export const SetSimilarListing = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_SIMILAR_LISTING",
      data,
    });
    return Promise.resolve();
  };
}

export const SetSearchQuery = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_SEARCH_QUERY",
      data,
    });
    return Promise.resolve();
  };
}