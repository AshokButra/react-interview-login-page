import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {userId: '', pin: '', failureText: ''}

  onEnterUsername = event => {
    this.setState({userId: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({pin: event.target.value})
  }

  onsubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      failureText: errorMsg,
    })
  }

  submitform = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }
    console.log(userDetails)
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onsubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {failureText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="login-img"
            alt="website login"
          />
          <form className="form-page" onSubmit={this.submitform}>
            <h1 className="welcome-back">Welcome Back!</h1>
            <label htmlFor="userInput">User ID</label>
            <input
              className="user-input"
              id="userInput"
              type="text"
              onChange={this.onEnterUsername}
            />
            <br />
            <label htmlFor="userInputPin">PIN</label>
            <input
              className="user-input"
              id="userInputPin"
              type="password"
              onChange={this.onEnterPassword}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="error-message">{failureText}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
