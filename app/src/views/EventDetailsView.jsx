import {useEffect, useState} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const EventDetailsView = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [event, setEvent] = useState(null)
  const [fromPastEvents, setFromPastEvents] = useState(false)
  const {events, pastEvents, loading} = useSelector(state => state.eventsReducer)

  useEffect(() => {
    const allEvents = [...events, ...pastEvents]
    setEvent(allEvents.find(event => event._id === id))

    if(pastEvents.find(event => event._id === id)){
      setFromPastEvents(true)
    }else{
      setFromPastEvents(false)
    }
  },[id, loading, events, pastEvents])

  

  return (
    <div className="container content">
      <div className="single-event page-card">
        <div className="single-event-header">
          <p className="back-btn" onClick={() => fromPastEvents ? navigate("/pastevents") : navigate(-1)}><i className="fa-solid fa-arrow-left"></i> Go Back</p>
          <h2>
            {event?.title}
          </h2>
        </div>
        <div className="single-event-meta" style={{borderBottom: event?.color + ' 2px solid'}}>
          <p>Datum: {event?.dateTime.split('T')[0]}</p>
          <p>Tid: {event?.dateTime.split('T')[1]}</p>
        </div>
        <p className="single-event-content">{event?.desc}</p>
      </div>
    </div>
  )
}

export default EventDetailsView