import {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import profilePic from '../img/face.png'
import Form from './Form'
import UserModal from './UserModal'


const Header = () => {
  const location = useLocation()
  const [modalOpen, setModalOpen] = useState(false)
  const [userModalOpen, setUserModalOpen] = useState(false)

  useEffect(() => closeModals(), [location.pathname])

  const closeModals = () => {
    setModalOpen(false)
    setUserModalOpen(false)
  }

  return (
    <div className="header-wrapper">
    {(modalOpen || userModalOpen) && <div className="overlay" onClick={ closeModals }></div>}
    <div className="header container">
      {modalOpen && <Form setModalOpen={setModalOpen} />}
      <Link to="/">
      <h1>Your Events</h1>
      </Link>
      <div className="header-options">
        <div className="btn-add-event btn btn-primary" onClick={() => setModalOpen(true)}>Add new event</div>
        <div className="avatar" onClick={() => setUserModalOpen(true)}>
          <img src={profilePic} alt="" />
          {userModalOpen && <UserModal setUserModalOpen={setUserModalOpen} />}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Header