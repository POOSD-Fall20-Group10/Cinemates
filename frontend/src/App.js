import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';

import './bootstrap.min.css';
import './App.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';

import Login from "./components/login.component";
import Register from "./components/register.component";

import logo from './Cinemates.png';

function App() {
  return (
  <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Login</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="outer">
      <div>&nbsp;&nbsp;&nbsp;</div>
      <div className="container-div">
        <img src={logo} alt="Cinemates" width="300" height="300"></img>
      </div>
        <div className="inner">
        <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/main" exact>
          <MainPage />
        </Route>
        <Redirect to="/" />
      </Switch>
        </div>
      </div>
    </div>
    <div>&nbsp;&nbsp;&nbsp;</div>
    </Router>
  );
}

export default App;
