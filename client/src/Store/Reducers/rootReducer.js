import {combineReducers} from 'redux';
import listReducer from './listingReducer';
import cartypeReducer from './cartypeReducer';
import clientReducer from './clientReducer';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import sellingReducer from './sellingReducer';
import chatReducer from './chatReducer';
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
    list: listReducer,
    cartypes: cartypeReducer,
    client: clientReducer,
    login: loginReducer,
    signup: signupReducer,
    selling: sellingReducer,
    chat: chatReducer,
    news: newsReducer,
});
export default rootReducer;
