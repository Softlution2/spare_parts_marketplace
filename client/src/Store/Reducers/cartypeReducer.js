import initState1 from '../../softdata.json';
const initState = {
    ...initState1[0].cartypes
}
const cartypeReducer = (state = initState, action) => {
    return state;  
}
export default cartypeReducer;