import initState1 from '../../softdata.json';
const initState = {
    ...initState1[0].blog
}
const newsReducer = (state = initState, action) => {
    return state;  
}
export default newsReducer;