import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { createEvent } from '../store/actions/eventsActions'

const FormView = ({setModalOpen}) => {
  const {token} = useSelector(state => state.authReducer)
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    dateTime: '',
    color: '#2bcb5e'
  })

  const [errors, setErrors] = useState({
    titleError: null,
    descError: null,
    dateError: null,
  })


  const formatDate = (date) => {
    if(date === '') return ''

    const formated = date.split('T')

    return `${formated[0]} Tid: ${formated[1]}`
  }

  const onChange = (e) => {

    setFormData(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(formData.title === ''){
      setErrors(state => ({
        ...state,
        titleError: 'Please write a title'
      }))
      return
    }else {
      setErrors(state => ({
        ...state,
        titleError: ''
      }))
    }

    if(formData.dateTime === ''){
      setErrors(state => ({
        ...state,
        dateError: 'Please choose a date and time'
      }))
      return
    }else {
      setErrors(state => ({
        ...state,
        dateError: ''
      }))
    }

    if(formData.desc === ''){
      setErrors(state => ({
        ...state,
        descError: 'Please write a description'
      }))
      return
    }else {
      setErrors(state => ({
        ...state,
        descError: ''
      }))
    }

    const newEvent = {
      event: {
        ...formData
      },
      token,
    }

    dispatch(createEvent(newEvent))
    setModalOpen(false)
  }

  return (
    <div className="event-form container">
      <div className="form-wrapper">
      <h1>Add Event</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          {errors.titleError && <span className="error">{errors.titleError}<i className="fa-solid fa-circle-xmark"></i></span>}
            <label htmlFor="form-title">Title</label>
            <input onChange={onChange} value={formData.title} name="title" id="form-title" className="form-input" type="text" />
          </div>
          <div className="form-row">
            <div className="form-group">
            {errors.dateError && <span className="error">{errors.dateError}<i className="fa-solid fa-circle-xmark"></i></span>}
              <label>Datum</label>
              <div className="datepicker">
                <input className="date-output form-input" value={formatDate(formData.dateTime)}  readOnly={true} type="text" />
                <input name="dateTime" className="date-input" type="datetime-local" id="dateInput"
                onChange={onChange} value={formData.dateTime} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="clr-picker" className="color-label">Color</label>
              <input onChange={onChange} name="color" id="clr-picker" type="color" defaultValue={formData.color} />
            </div>
          </div>
          <div className="form-group">
          {errors.descError && <span className="error">{errors.descError}<i className="fa-solid fa-circle-xmark"></i></span>}
            <label htmlFor="form-desc">Description</label>
            <textarea name="desc" onChange={onChange} value={formData.desc} id="form-desc" className="form-input" rows="10" cols="50" />
          </div>
          <button className="btn btn-primary">Add Event</button>
        </form>
      </div>
    </div>
  )
}

export default FormView