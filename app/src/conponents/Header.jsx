import {useState} from 'react'
import {Link} from 'react-router-dom'
import profilePic from '../img/face.png'
import Form from './Form'

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="header-wrapper">
    {modalOpen && <div className="overlay" onClick={() => setModalOpen(false)}></div>}
    <div className="header container">
      {modalOpen && <Form setModalOpen={setModalOpen} />}
      <Link to="/">
      <h1>Your Events</h1>
      </Link>
      <div className="header-options">
        <div className="btn-add-event btn btn-primary" onClick={() => setModalOpen(true)}>Add new event</div>
        <div className="avatar">
          <img src={profilePic} alt="" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Header