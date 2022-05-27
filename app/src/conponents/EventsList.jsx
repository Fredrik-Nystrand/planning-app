import React from 'react'
import {useSelector} from 'react-redux'

import EventItem from './EventItem'

const EventsList = () => {
  const {events} = useSelector(state => state.eventsReducer)
  return (
    <div className="events-list page-card">
      <h2>Future Events</h2>
      {events.map(event => (
        <EventItem key={event._id} event={event} />
      ))}
    </div>
  )
}

export default EventsList