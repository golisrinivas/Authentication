import { Component } from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import LoginForm from "./components/LoginForm";

import CreateUserForm from "./components/CreateUserForm";

import InputResults from "./components/InputResults";

import Home from "./components/Home";

class App extends Component{
  render(){
    return(
      <Router>
        <Routes>
          <Route exact path="/login" element = {<LoginForm/>}/>
          <Route exact path = "/" element = {<Home/>}/>
          <Route exact path="/signup" element = {<CreateUserForm/>}/>
        </Routes>
      </Router>
    )
  }
}

export default App;