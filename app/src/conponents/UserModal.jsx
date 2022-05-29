import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import profilePic from '../img/face.png'
import {logout} from '../store/actions/authActions'

const UserModal = () => {
  const {name, email} = useSelector(state => state.authReducer)
  const dispatch = useDispatch()

  return (
    <div className="user-modal">
      <div className="user-modal-header">
        <div className="user-modal-avatar">
          <img src={profilePic} alt="The user" />
        </div>
        <div className="user-info">
          <div className="user-name">{name}</div>
          <div className="user-email">{email}</div>
        </div>
      </div>
      <div className="user-modal-content">
        <Link to="/pastevents"><button className="btn btn-secondary">My past events</button></Link>
        <button className="btn btn-primary" onClick={()=> dispatch(logout())}>Logout</button>
      </div>
    </div>
  )
}

export default UserModal