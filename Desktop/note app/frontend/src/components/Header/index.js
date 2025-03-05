import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import "./index.css"

const Header = (props) => {
    const onclickLagout = () => {
        const {history} = props 
        Cookies.remove("jwt_token")
        history.replace("/login")
        window.location.reload();
    }
    const onclickNotes = () => {
        const {history} = props 
        history.replace("/notes")
        window.location.reload();
    }
    const onclickHome = () => {
        const {history} = props 
        history.replace("/")
        window.location.reload();
    }

    return(
        <div className='header-container'>
        <img
          src="/7680765.jpg"
       className='header-logo'
          alt="website logo"
        />
        <div className='note-logut-continaer'>
            
            <button onClick={onclickNotes} type="button" className='note-button'>Notes</button>
            <button onClick={onclickHome} type="button" className='note-button'>Home</button>
            <button onClick={onclickLagout} type="button" className='logout-button'>Logout</button></div>
        
        </div>
    )
}
export default withRouter(Header)