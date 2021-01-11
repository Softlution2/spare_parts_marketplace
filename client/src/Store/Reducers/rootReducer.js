import {combineReducers} from 'redux';
import listReducer from './listingReducer';
import cartypeReducer from './cartypeReducer';
import clientReducer from './clientReducer';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import sellingReducer from './sellingReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
    list: listReducer,
    cartypes: cartypeReducer,
    client: clientReducer,
    login: loginReducer,
    signup: signupReducer,
    selling: sellingReducer,
    chat: chatReducer,
});
export default rootReducer;
