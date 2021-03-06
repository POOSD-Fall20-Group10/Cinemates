
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './bootstrap.min.css';
import './App.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import GroupPage from './pages/GroupPage';
import AccountPage from './pages/AccountPage';
import VerifyPage from './pages/VerifyPage';
import ResetPage from './pages/ResetPage';
import MoviePage from './pages/MoviePage';

import logo from './Cinemates.png';

function App() {
  return (
    <Router>
    <div className="App">
      <div className="outer">
        <div>
        <Switch>
        <Route path="/" exact>
          <div className="inner">
          <img src={logo} alt="Cinemates" width="200" height="200"></img>
          <LoginPage/>
          </div>
        </Route>
        <Route path="/register" exact>
        <div className="inner">
            <img src={logo} alt="Cinemates" width="200" height="200"></img>
            <RegisterPage/>
          </div>
        </Route>
        <Route path="/main" exact>
          <MainPage/>
        </Route>
        <Route path="/group" exact>
          <GroupPage />
        </Route>
        <Route path="/account" exact>
          <AccountPage />
        </Route>
        <Route path="/verify" exact>
          <VerifyPage />
        </Route>
        <Route path="/Reset" exact>
          <ResetPage />
        </Route>
        <Route path="/movie" exact>
          <MoviePage />
        </Route>
        <Redirect to="/" />
      </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
