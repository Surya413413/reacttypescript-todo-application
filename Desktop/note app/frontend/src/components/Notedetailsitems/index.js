
import { Component } from "react"
import Cookies from 'js-cookie'
import Header from "../Header"
import "./index.css"
class Notedetailsitems extends Component {
    state = {notesitems:[]}

   
componentDidMount(){
    this.getdata()
}
getdata = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
console.log(`geting id: ${id}`)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `http://localhost:3000/notes/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json"
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    
    try{
        const data = await response.json()
        console.log(data)
        this.setState({notesitems:data})
    }catch(error){
        console.error("Error fetching notes:", error.message);
    }
   
    
}

onClickBack = () => {
    const {history} = this.props
    history.replace("/notes")
    window.location.reload();
}

render() {
    const {notesitems} = this.state
    const {
        category,
        content,
        created_at,pinned,
        title,
        updated_at,archived
        } = notesitems
        const createdAt = created_at;
const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long", // "short" for abbreviated month (e.g., Feb)
  day: "2-digit",
});
const formattedupdate = new Date(updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" for abbreviated month (e.g., Feb)
    day: "2-digit",
  });
    return (
        <>
         <Header/>
       
        <div className="container-note"> 
        <div className="notedetails-container">
        <h1>Note Details</h1>
        <h1>Title: {title}</h1>
        <p>Content: {content}</p>
        <p>category: {category}</p>
        <p>created: {formattedDate}</p>
        <p>updated: {formattedupdate}</p>
        <>
        <button type="button" onClick={this.onClickBack} className="register-button">Back Page</button>
        </>
        </div>
        </div>
        </>
    )
}
}
export default Notedetailsitems

















// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Home from "../Home"
// const Notedetailsitems = () => {
//     const { id } = useParams();
//     const [note, setNote] = useState(null);
//     const [error, setError] = useState("");

//     useEffect(() => {
        
//         const fetchNote = async () => {
//             console.log("Fetching note for ID:", id);
//             //const token = localStorage.getItem("token")
//             const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5NzgxMjA5fQ.wzH9EDo3H5PTshNyP-gfC19-QDgD1G9HSeta4IvEPCw";
//             const response = await fetch(`http://localhost:3000/notes/${id}`, {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json"
//                 }
//             });

//             if (!response.ok) {
//                 setError("Failed to fetch note.");
//                 return;
//             }

//             const data = await response.json();
//             setNote(data);
//             console.log(data)
//         };

//         fetchNote();
//     }, [id]);

//      if (error) return <p>{error}</p>;
//     if (!note) return <p>Loading...</p>;

//     return (
//         <>
//         <Home/>
//          <div>

//             <h1>{note.title}</h1>
//             <p>{note.content}</p>
            
//         </div> 
//         </>
//     );
// };

// export default Notedetailsitems



































