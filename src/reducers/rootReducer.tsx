import { combineReducers } from 'redux';
import userReducer from './userReducer';
import clientReducer from './clientReducer';

const rootReducer = combineReducers({
  userReducer,
  clientReducer,
});

export default rootReducer;
