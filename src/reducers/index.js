import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import listReducer from './listReducer';
import SingleUserReducer from './SingleUserReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  list: listReducer,
  singleUser: SingleUserReducer
});
