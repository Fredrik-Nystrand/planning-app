import {useState, useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
import {registerUser, loginUser} from '../store/actions/authActions'
import {hasNumber, hasSpecial, checkEmail} from '../helpers'

const LoginView = () => {
  const {error, token} = useSelector(state => state.authReducer)
  const [loggingIn, setLoggingIn] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  })

  const [errors, setErrors] = useState({
    nameError: null,
    emailError: null,
    passwordError: null,
  })



  
 

  const validateName = useCallback((name) => {

      setErrors(state => ({
        ...state,
        nameError: ''
      }))
  
      if(name.length < 2 ){
        setErrors(state => ({
          ...state,
          nameError: 'Needs more than 2 characters'
        }))
        return false
      }
  
      if(hasNumber(name)){
        setErrors(state => ({
          ...state,
          nameError: 'Numbers are not allowed in your name'
        }))
        return false
      }
  
      if(hasSpecial(name)){
        setErrors(state => ({
          ...state,
          nameError: 'Special characters not allowed'
        }))
        return false
      }    

      return true

  }, [])

  const validateEmail = useCallback((email) => {
      setErrors(state => ({
        ...state,
        emailError: ''
      }))

      if(email === ''){
        setErrors(state => ({
          ...state,
          emailError: 'Please enter an email'
        }))
        return false
      }

      if(!checkEmail(email).success){
        setErrors(state => ({
          ...state,
          emailError: 'Please enter a valid email'
        }))
        return false
      }

      if(error){
        setErrors(state => ({
          ...state,
          emailError: error 
        }))
        return false
      }

      return true
  }, [error])

  const validatePassword = useCallback((password1, password2) => {
      setErrors(state => ({
        ...state,
        passwordError: ''
      }))

      if(password1 === '' ){
        setErrors(state => ({
          ...state,
          passwordError: 'Please enter a password'
        }))
        return false
      }

      if(password1.length < 3 ){
        setErrors(state => ({
          ...state,
          passwordError: 'Needs more than 3 characters'
        }))
        return false
      }

      if(password1 !== password2 ){
        setErrors(state => ({
          ...state,
          passwordError: 'Passwords do not match'
        }))
        return false
      }

      return true
  }, [])

  const onChange = (e) => {

    setFormData(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  const renderMemberQuery = () => {
    if(loggingIn){
      return (
      <div className="action">Not a memeber?
        <p onClick={toggleIsLoggingIn}>
          Register here!
        </p>
      </div>
      )
    }else {
      return (
        <div className="action">Already a memeber?
          <p onClick={toggleIsLoggingIn}>
            Sign in here!
          </p>
        </div>
        )
    }
  }

  const toggleIsLoggingIn = (e) => {
    e.preventDefault()
    setLoggingIn(!loggingIn)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(loggingIn){

      const user = {
        email: formData.email,
        password: formData.password1
      }

      dispatch(loginUser(user))

    }else{


      if(errors.nameError === '' && errors.emailError === '' && errors.passwordError === '') {

        const user = {
          name: formData.username,
          email: formData.email,
          password: formData.password1
        }
  
        dispatch(registerUser(user))

      }

    }
  }

  useEffect(() => {
    if(token){
      navigate(state?.from || "/")
    } 
   }, [token, navigate, state])

  useEffect(() => {
    setErrors(state => ({
      ...state,
      emailError: error
    }))
  }, [error])


  useEffect(() => {
    if(formData.username.length > 0)
      validateName(formData.username)
  }, [formData.username, validateName])

  useEffect(() => {
    if(formData.email.length > 0)
      validateEmail(formData.email)
  }, [formData.email, validateEmail])

  useEffect(() => {
    if(formData.password1.length > 0 || formData.password2.length > 0)
      validatePassword(formData.password1, formData.password2)
  }, [formData.password1, formData.password2, validatePassword])


  return (
    <div className="login container content">
      <form onSubmit={handleSubmit} >
        <h1>{loggingIn ? 'Login' : 'Register'}</h1>
        {!loggingIn && <div className="form-group">
          {errors.nameError && <span className="error">{errors.nameError}<i className="fa-solid fa-circle-xmark"></i></span>}
          <label htmlFor="username">Name</label>
          <input onChange={onChange} defaultValue={formData.name} name="username" id="username" className="form-input" type="text" />
        </div>}
        <div className="form-group">
          {(errors.emailError) && <span className="error">{errors.emailError}<i className="fa-solid fa-circle-xmark"></i></span>}
          <label htmlFor="email">Email</label>
          <input onChange={onChange} value={formData.email} name="email" id="email" className="form-input" type="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <input onChange={onChange} value={formData.password1} name="password1" id="password1" className="form-input" type="password" />
        </div>
        {!loggingIn && <div className="form-group">
        {errors.passwordError && <span className="error">{errors.passwordError}<i className="fa-solid fa-circle-xmark"></i></span>}
          <label htmlFor="password2">Confirm Password</label>
          <input onChange={onChange} defaultValue={formData.password2} name="password2" id="password2" className="form-input" type="password" />
        </div>}
        {renderMemberQuery()}
        <button className="btn btn-primary">{loggingIn ? 'Login' : 'Register'}</button>
      </form>
    </div>
  )
}

export default LoginView