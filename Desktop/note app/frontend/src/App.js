

import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';

import Home from "./components/Home"
import LoginForm from "./components/LoginForm";
 import Register from "./components/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import HomePage from "./components/HomePage"
import Notedetailsitems from './components/Notedetailsitems';
import NotFound from './components/NotFound';
import CreateNotes from './components/CreateNotes';
import "./App.css"

const App = () => (

   <BrowserRouter>
   <Switch>
   
   <Route  exact path="/login" component={LoginForm} />
  <Route exact path="/register" component={Register}/>
  <ProtectedRoute exact path="/" component={Home}/>
  <ProtectedRoute exact path="/notes/create" component={CreateNotes}/>
  <ProtectedRoute exact path="/notes" component={HomePage}/>
  <ProtectedRoute exact path="/notes/:id" component={Notedetailsitems}/>   
  <Route exact path="/not-found" component={NotFound} />
  <Redirect to="not-found" />
 </Switch>
</BrowserRouter>
  )



export default App

