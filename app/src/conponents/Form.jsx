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
            <label htmlFor="form-title">Title</label>
            <input onChange={onChange} value={formData.title} name="title" id="form-title" className="form-input" type="text" />
          </div>
          <div className="form-row">
            <div className="form-group">
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