import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import { Redirect } from "react-router-dom";


const ProtectedRoute = ({auth,component:Component, ... rest}) => {
  return(
    <Route 
    {...rest}
     render = {() => auth? (
      < component />
     ) : 
     (
       <Redirect to ="/" />
     )
     }
     />
  
    )
  }

const App = () => {
  
  return (
    <div className="background">
       <div className = "border">
     
      <div className="nav-bar">
   {/*   <span className = "block">
          <Link to="/">Home</Link>
          </span>
        <span className = "block">
          <Link to="/login">Login</Link>
  </span>*/}


      
      </div>
      <Switch>
        <Route path="/login" component={Home} />
        <Route path="/" component={Login} /> 
      </Switch>
      </div>
    </div>
  );
}



export default App;
