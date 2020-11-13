
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';

import './bootstrap.min.css';
import './App.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import GroupPage from './pages/GroupPage';
import AccountPage from './pages/AccountPage';

import logo from './Cinemates.png';

function App() {
  return (
  <Router>
    <div className="App">
      <div className="outer">
      <div>&nbsp;&nbsp;&nbsp;</div>
      <div className="container-div">
        <img src={logo} alt="Cinemates" width="200" height="200"></img>
      </div>
        <div className="inner">
        <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/main" exact>
          <MainPage />
        </Route>
        <Route path="/group" exact>
          <GroupPage />
        </Route>
        <Route path="/account" exact>
          <AccountPage />
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
