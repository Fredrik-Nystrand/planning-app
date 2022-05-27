import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/actions/authActions';
import { getEvents } from './store/actions/eventsActions';


import Header from './conponents/Header';
import EventsView from './views/EventsView';
import LoginView from './views/LoginView';
import ProtectedUserRoutes from './routes/ProtectedUserRoutes';
import EventDetailsView from './views/EventDetailsView';
import PastEventsView from './views/PastEventsView';


function App() {

  const dispatch = useDispatch();
  const {token} = useSelector(state => state.authReducer);
  const {events, loading} = useSelector(state => state.eventsReducer);

  useEffect(() => {
    dispatch(checkAuth())
    if(token){
      dispatch(getEvents(token))
    }
  }, [dispatch, token])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={
            <ProtectedUserRoutes>
              <EventsView />
            </ProtectedUserRoutes>
          } />
          <Route path="/event/:id" element={
            <ProtectedUserRoutes>
              <EventDetailsView />
            </ProtectedUserRoutes>
          } />
          <Route path="/pastevents" element={
            <ProtectedUserRoutes>
              <PastEventsView />
            </ProtectedUserRoutes>
          } />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
