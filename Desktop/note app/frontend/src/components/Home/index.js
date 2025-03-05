
import {Link,withRouter} from "react-router-dom"
import Header from "../Header"
import "./index.css"

const Home = (props) => {
  const onClickLogin = () => {
    const {history} = props 
    history.replace("/notes")
    window.location.reload();
    
  }
    return (
        <>
           <Header/>
           <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">"Your ideas deserve a place to grow—write them down!"</h1>
        <img
         src="/8459331.jpg"
          alt="clothes that get you noticed"
          className="home-mobile-img"
        />
        <p className="home-description">
        A Notes App allows users to create, view, search, pin, archive, and delete notes efficiently. Users can add new notes with a title and content, and a search feature enables filtering notes by title. Important notes can be pinned to stay at the top, while archived notes are moved to a separate section for later retrieval. Users can also delete notes permanently if needed. The app includes authentication using JWT, ensuring that only authorized users can access their notes. The backend, built with Node.js, Express, and SQLite, handles CRUD operations through secure API routes. The frontend, developed in React.js with class-based components, manages state and interacts with the backend using Fetch API. To enhance functionality, features like categories, rich text editing, and cloud storage can be integrated in the future.
        </p>
        <Link to="/products">
        <button type="button" onClick={onClickLogin} className="shop-now-button">
            View Notes 
          </button>
        </Link>
      </div>
      <img
         src="/8459331.jpg"
        alt="clothes that get you noticed"
        className="home-desktop-img"
      />
    </div>
         
        
    
        </>
    )
}
export default withRouter(Home)