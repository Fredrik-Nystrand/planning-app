const actiontypes = () => {
  return {
    auth: {
      authorize: 'AUTHORIZE',
      authorizeSuccess: 'AUTHORIZE_SUCCESS',
      authorizeFailure: 'AUTHORIZE_FAILURE',
      logout: 'LOGOUT',
    },
    events: {
      createEvent: 'CREATE_EVENT',
      createFutureEventSuccess: 'CREATE_FUTURE_EVENT_SUCCESS',
      createPastEventSuccess: 'CREATE_PAST_EVENT_SUCCESS',
      createEventFailure: 'CREATE_EVENT_FAILURE',
      getEvents: 'GET_EVENTS',
      getFutureEventsSuccess: 'GET_FUTURE_EVENTS_SUCCESS',
      getPastEventsSuccess: 'GET_PAST_EVENTS_SUCCESS',
      getEventsFailure: 'GET_EVENTS_FAILURE',
      getSingleEvent: 'GET_SINGLE_EVENT',
      getSingleEventSuccess: 'GET_SINGLE_EVENT_SUCCESS',
      getSingleEventFailure: 'GET_SINGLE_EVENT_FAILURE',
      editEvent: 'EDIT_EVENT',
      editEventSuccess: 'EDIT_EVENT_SUCCESS',
      editEventFailure: 'EDIT_EVENT_FAILURE',
      deleteEvent: 'DELETE_EVENT',
      deleteEventSuccess: 'DELETE_EVENT_SUCCESS',
      deleteEventFailure: 'DELETE_EVENT_FAILURE',
    },
  }
}

export default actiontypes