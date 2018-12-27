import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER, SET_USER_LiST,SINGLE_USER } from './types';
// Get User List
export const listUser = () => dispatch => {
  axios
  .get('https://reqres.in/api/users')
.then(res =>{ 
    dispatch({
    type: SET_USER_LiST,
    payload: res.data
  });
})
  .catch(err=>
    dispatch({
      type: GET_ERRORS,
      payload: err.response&&err.response.data?err.response.data:""
    })
  );
};
// Get  single User 
export const singleUser = (userData) => dispatch => {
  axios
  .get('https://reqres.in/api/users/' + userData.id )
.then(res =>{ 
    dispatch({
    type: SINGLE_USER,
    payload: res.data
  });
})
  .catch(err=>
    dispatch({
      type: GET_ERRORS,
      payload: err.response&&err.response.data?err.response.data:""
    })
  );
};
// update User 
export const updateUser = (userData, history) => dispatch => {
  axios
  .put('https://reqres.in/api/users', userData)
.then(res =>{ 
  history.push('/userlist')
})
  .catch(err=>
    dispatch({
      type: GET_ERRORS,
      payload: err.response&&err.response.data?err.response.data:""
    })
  );
};
// create User 
export const createUser = (userData, history) => dispatch => {
  axios
  .post('https://reqres.in/api/users', userData)
.then(res =>{ 
  history.push('/userlist')
})
  .catch(err=>
    dispatch({
      type: GET_ERRORS,
      payload: err.response&&err.response.data?err.response.data:""
    })
  );
};
// delete User 
export const deleteUser = (userData, history) => dispatch => {
  axios
  .delete('https://reqres.in/api/users/' + userData)
.then(res =>{ 
  history.push('/listuser')
})
  .catch(err=>
    dispatch({
      type: GET_ERRORS,
      payload: err.response&&err.response.data?err.response.data:""
    })
  );
};

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('https://reqres.in/api/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response&&err.response.data?err.response.data:""
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('https://reqres.in/api/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      setAuthToken(token);
      dispatch(setCurrentUser(token));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response&&err.response.data?err.response.data:""
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
