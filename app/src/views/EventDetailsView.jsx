import {useEffect, useState} from 'react'
import { useParams, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const EventDetailsView = () => {

  const {id} = useParams()
  const [event, setEvent] = useState(null)
  const {events} = useSelector(state => state.eventsReducer)

  useEffect(() => {
    setEvent(events.find(event => event._id === id))
  },[id, events])

  return (
    <div className="container content">
      <div className="single-event page-card">
        <div className="single-event-header">
          <Link to="/" className="back-btn"><i className="fa-solid fa-arrow-left"></i> Go Back</Link>
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