import actiontypes from '../actiontypes';


const initState = {
  error: null,
  loading: false,
  token: null,
  id: null,
  name: null,
  email: null,
}

const authReducer = (state = initState, action) => {

  switch (action.type) {
    case actiontypes().auth.authorize:
      return {
        ...state,
        loading: true
      }

    case actiontypes().auth.authorizeSuccess:
      localStorage.setItem('token', action.payload.token)
      //console.log(action.payload)
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      }
    
    case actiontypes().auth.authorizeFailure:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case actiontypes().auth.logout:
      localStorage.removeItem('token')
      return{
        ...initState
      }

    default:
      return state
  }
}

export default authReducer;