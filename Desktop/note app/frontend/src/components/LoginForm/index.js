

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
//import notelogo from "frontend\public\8459331.jpg";
import './index.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    console.log(this.props.history); 
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30,})
   
    history.replace("/notes")
    window.location.reload();
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const userDetails = {email, password}
    const url = 'http://localhost:3000/users/login'
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      console.log("JWT Token Stored:", data.token);
      this.onSubmitSuccess(data.token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          required
        />
      </>
    )
  }
  renderUsernameField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
        EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeUsername}
          placeholder="email"
          required
        />
      </>
    )
  }
  register = (event) => {
    event.preventDefault();
    const {history} = this.props
    history.replace('/register');
    window.location.reload();

  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/notes"/>
    }

    return (
      <div className="login-form-container">
        <img
          src="/7680765.jpg"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="/8459331.jpg"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="/7680765.jpg"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg} Email and password Incorrect If you are not register please register</p>}
          <button className="login-button"  type="button" onClick={this.register}>Register Now</button>
        </form>
      </div>
    )
  }
}

export default LoginForm

// const LoginForm = () => {
//   return(
//     <>login from</>
//   )
// }
// export default LoginForm