import Cookies from 'js-cookie'
import { Redirect,Route } from "react-router-dom"

const ProtectedRoute = (props) => {
    const token = Cookies.get('jwt_token')
    //const token = "CoeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5NzgxMjA5fQ.wzH9EDo3H5PTshNyP-gfC19-QDgD1G9HSeta4IvEPCw"
    if (token === undefined){
        return <Redirect to="/login"/>
    }
    return <Route {...props}/>

}
export default ProtectedRoute