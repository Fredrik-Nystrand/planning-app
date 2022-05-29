import axios from 'axios'
import actiontypes from '../actiontypes'

export const createEvent = (payload) => {
  
  return async dispatch => {
    dispatch({
      type: actiontypes().events.createEvent
    })
    try {
      console.log(payload.event)
      const res = await axios.post('http://localhost:9000/api/events', payload.event, {headers: { Authorization: "Bearer " + payload.token}})
      
      if(res.status === 200){
        if(Date.parse(res.data.dateTime) > Date.now()){
          dispatch(createFutureEventSuccess(res.data))
        }else{
          dispatch(createPastEventSuccess(res.data))
        }

      }

      
    } catch (err) {
      dispatch(createEventFailure(err))
    }
  }
}


const createFutureEventSuccess = (event) => {
  return {
    type: actiontypes().events.createFutureEventSuccess,
    payload: event
  }
}

const createPastEventSuccess = (event) => {
  return {
    type: actiontypes().events.createPastEventSuccess,
    payload: event
  }
}

const createEventFailure = (err) => {
  console.log(err)
  return {
    type: actiontypes().events.createEventFailure,
    payload: err
  }
}


export const getEvents = (token) => {
  return async dispatch => {
    dispatch({
      type: actiontypes().events.getEvents
    })
    try {
      const res = await axios.get('http://localhost:9000/api/events', {headers: { Authorization: "Bearer " + token}})
      
      if(res.status === 200){
        const futureEvents = res.data.filter(event => Date.parse(event.dateTime) > Date.now())
        const pastEvents = res.data.filter(event => Date.parse(event.dateTime) < Date.now())
      
        dispatch(getFutureEventsSuccess(futureEvents))
        dispatch(getPastEventsSuccess(pastEvents))
      }
      
      

    } catch (err) {
      dispatch(getEventsFailure(err.message))
    }
  }
}

const getFutureEventsSuccess = (events) => {
  return {
    type: actiontypes().events.getFutureEventsSuccess,
    payload: events
  }
}

const getPastEventsSuccess = (events) => {
  return {
    type: actiontypes().events.getPastEventsSuccess,
    payload: events
  }
}

const getEventsFailure = (err) => {
  return {
    type: actiontypes().events.getEventsFailure,
    payload: err
  }

}