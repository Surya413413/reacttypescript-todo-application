import { Component } from "react";
import {Link, withRouter} from "react-router-dom"
import {navigate} from "react-router-dom"
import Cookies from "js-cookie"
import Header from "../Header";

import "./index.css"; // Import CSS file

class CreateNotes extends Component {
  state = {
    title: "",
    content: "",
    category:"",
    message:"",
    redirect:false}
  handleChangetitle = (event) => {
this.setState({title:event.target.value})
  }

  handleChangecontent = event => {
    this.setState({content:event.target.value})
  }
  handleChangecategory = event => {
    this.setState({category:event.target.value})
  }

 handleSubmit = async (event) => {
    event.preventDefault();
    const {title,content,category} = this.state
    console.log("Form Data Before Sending:", { title, content, category }); // Debugging

  if (!title || !content || !category) {
    this.setState({ message: "All fields are required!" });
    return;
  }
    const formData = {
      title,
      content,
      category
    }

    try {
        const jwtToken = Cookies.get('jwt_token')
      const url = "http://localhost:3000/notes/create"
      const option ={
        method: "POST",
        headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
         },

        body: JSON.stringify({title,content,category}),
      }
      const response = await fetch(url,option)
      const data = await response.json(); 
      console.log(response)
      console.log(data)
      if (response.ok) {
        this.setState({message:response.statusText
          , redirect: true,title: "",               
          content: "",               
          category: "",});
        setTimeout(() => {
            window.location.href = "/notes" // React Router v5
        }, 1000);
      } else {
      this.setState({ message: data.error || "Failed to Create." });
      }
    } catch (error) {
      this.setState({message:`${error} :"Error: Unable to Create.` });
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
  const {title,content,category,message,redirect} = this.state
 
  return (
    <>
    <Header/>
    
    <div className="register-container">
      <div className="register-box">
        <div className="imge-regitertext">
        <img
            src="/7680765.jpg"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
        <h2 className="register-title">Create Notes</h2>
        </div>
     
         <p className="register-message">{message}</p>
        <form onSubmit={this.handleSubmit} className="register-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChangetitle}
            required
            className="register-input"
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={content}
            onChange={this.handleChangecontent}
            required
            className="register-input"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={category}
            onChange={this.handleChangecategory}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">
            Create Note 
          </button>
        </form>
        {/* {message === "Created" ? window.location.href = "/notes" :""}  */}
        <br/>
        {/* <button onClick={this.loginpage} type="button" className="register-button">
            Login page
          </button> */}
        
      </div>
    </div>
    </>
  );
}
};

export default withRouter(CreateNotes);