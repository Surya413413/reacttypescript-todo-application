
import { Component } from "react";
import {Link, withRouter} from "react-router-dom"
import {navigate} from "react-router-dom"

import "./index.css"; // Import CSS file

class Register extends Component {
  state = {name: "",
    email: "",
    password: "",
    message:"",
    redirect:false}
  handleChangename = (event) => {
this.setState({name:event.target.value})
  }

  handleChangeemail = event => {
    this.setState({email:event.target.value})
  }
  handleChangepassword = event => {
    this.setState({password:event.target.value})
  }

 handleSubmit = async (event) => {
    event.preventDefault();
    const {name,email,password} = this.state
    console.log("Form Data Before Sending:", { name, email, password }); // Debugging

  if (!name || !email || !password) {
    this.setState({ message: "All fields are required!" });
    return;
  }
    const formData = {
      name,
      email,
      password
    }

    try {
      const url = "http://localhost:3000/users/register"
      const option ={
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name,email,password}),
      }
      const response = await fetch(url,option)
      const data = await response.json(); 
      console.log(response)
      console.log(data)
      if (response.ok) {
        this.setState({message:response.statusText
          , redirect: true,name: "",               
          email: "",               
          password: "",});
        setTimeout(() => {
          const {history} = this.props
          history.replace('/login'); // React Router v5
        }, 2000);
      } else {
      this.setState({ message: data.error || "Registration failed." });
      }
    } catch (error) {
      this.setState({message:`${error} :"Error: Unable to register.` });
      console.log(error)
    }
  };

  loginpage = (event) => {
    event.preventDefault();
    const {history} = this.props
    history.replace('/login');
    window.location.reload();
  }
render(){
  const {name,email,password,message,redirect} = this.state
 
  return (
    <div className="register-container">
      <div className="register-box">
        <div className="imge-regitertext">
        <img
            src="/7680765.jpg"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
        <h2 className="register-title">Register</h2>
        </div>
     
         <p className="register-message">{message}</p>
        <form onSubmit={this.handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={this.handleChangename}
            
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChangeemail}
            required
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChangepassword}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">
            Register 
          </button>
        </form>
        {/* {message === "created" ? window.location.href = "/login" :""} */}
        <br/>
        <button onClick={this.loginpage} type="button" className="register-button">
            Login page
          </button>
        
      </div>
    </div>
  );
}
};

export default Register;