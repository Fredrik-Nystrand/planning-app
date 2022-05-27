import actiontypes from '../actiontypes';

const initState = {
  loading: false,
  error: null,
  events: [],
  pastEvents: [],
}

const eventsReducer = (state = initState, action) => {
  switch (action.type) {

   // CREATE EVENT
   case actiontypes().events.createEvent:
    return {
      ...state,
    loading: true,
    }
  case actiontypes().events.createFutureEventSuccess:
    return {
      ...state,
    loading: false,
    error: null,
    events: [...state.events, action.payload].sort((a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime))
    }

  case actiontypes().events.createPastEventSuccess:
    return {
      ...state,
    loading: false,
    error: null,
    pastEvents: [...state.pastEvents, action.payload].sort((a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime))
    }

  case actiontypes().events.createEventFailure:
    return {
      ...state,
    loading: false,
    error: action.payload
  }

  // GET EVENTS
  case actiontypes().events.getEvents:
    return {
      ...state,
    loading: true,
    }

  case actiontypes().events.getFutureEventsSuccess:
    //console.log(action.payload)
    return {
      ...state,
    loading: false,
    error: null,
    events: action.payload.sort((a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime))
  }
  case actiontypes().events.getPastEventsSuccess:
    //console.log(action.payload)
    return {
      ...state,
    loading: false,
    error: null,
    pastEvents: action.payload.sort((a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime))
  }

  case actiontypes().events.getEventsFailure:
    return {
      ...state,
    loading: false,
    error: action.payload
  }
   
    default:
      return state
  }

  

}

export default eventsReducer;