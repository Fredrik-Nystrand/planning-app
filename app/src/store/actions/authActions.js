import axios from 'axios'
import actiontypes from '../actiontypes'
import jwt_decode from "jwt-decode";


const apiCall = async (url, user, dispatch) => {
  
  try {
    const res = await axios.post(url, user)
    dispatch(authSuccess(res.data))

  } catch (err) {
    if(err.response.data?.emailAlreadyExists){
      dispatch(authFailure('Email already exists'))
    }else {
      dispatch(authFailure('Could not create user'))
    }
    
  }
}

export const registerUser = (user) => {
  return dispatch => {
    apiCall('http://localhost:9000/api/users', user, dispatch)
  }
}

export const loginUser = (user) => {
  return dispatch => {
    apiCall('http://localhost:9000/api/users/login', user, dispatch)
  }
}

export const checkAuth = () => {
  return async dispatch => {
    const token = localStorage.getItem('token')

    if(token) {
      
      const decode = jwt_decode(token);
    
      if (decode.exp * 1000 < new Date().getTime()) {
          console.log('Token Expired')
          localStorage.removeItem('token')
      }else {
        const res = await dispatch(getUserInfo(decode.id, token))
        const userInfo = {
          token,
          email: res.email,
          name: res.name,
          id: res._id
        }
        dispatch(authSuccess(userInfo))
      }
    }
  }
}


const getUserInfo = (id, token) => {
  return async () => {
    const res = await axios.get(`http://localhost:9000/api/users/${id}`, {headers: { Authorization: "Bearer " + token}})
    return res.data
  }
}


const authSuccess = (user) => {
  return {
    type: actiontypes().auth.authorizeSuccess,
    payload: user
  }
}

const authFailure = (err) => {
  return {
    type: actiontypes().auth.authorizeFailure,
    payload: err
  }
}