const initState = {
};

const SellingReducer = (state = initState, action) => {
    switch (action.type) {
      case 'SELLING_INITIALIZE':
        return {
          ...initState
        }
      default:
          return state;
    }
}
export default SellingReducer