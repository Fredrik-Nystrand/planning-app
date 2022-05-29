import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import EventItem from './EventItem'

const EventsList = () => {
  const location = useLocation()
  const [eventsList, setEventsList] = useState([])
  const [isPast, setIsPast] = useState(false)
  const {events, pastEvents, loading} = useSelector(state => state.eventsReducer)

  

  useEffect(() => {
    if(location.pathname === '/pastevents'){
      setEventsList(pastEvents)
      setIsPast(true)
    }else{
      setEventsList(events)
      setIsPast(false)
    }
  }, [location.pathname, setEventsList, setIsPast, loading, events, pastEvents])


  return (
    <div className="events-list page-card">
      <h2>{isPast ? 'Past Events' : 'Future Events'}</h2>
      {eventsList.map(event => (
        <EventItem key={event._id} event={event} />
      ))}
    </div>
  )
}

export default EventsList