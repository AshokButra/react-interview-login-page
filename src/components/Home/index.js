import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <div className="home-container">
      <div className="nav-header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          className="bank-logo"
          alt="website logo"
        />
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        className="digital-card"
        alt="digital card"
      />
    </div>
  )
}

export default Home
