import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/sv'

const EventItem = ({event}) => {
  return (
    <Link to={`event/${event._id}`}>
      <div className="event-item" style={{borderBottom: event.color + ' 2px solid'}}>
        <p>{event.title}</p>
        <p>{moment(event.dateTime).fromNow()}</p>
      </div>
    </Link>
  )
}

export default EventItem