import React from 'react';
import { Link } from 'react-router-dom';
import '../bootstrap.min.css';

const app_name = 'cine-mates'

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    } else {
        return 'http://localhost:5000/' + route;
    }
}

function MainHeader()
{

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var login = ud.login;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };

    const openNotifications = event => //Needs to open notification window
    {
	    event.preventDefault();
    };
    const openSettings = event => //Needs to send to settings page
    {
        event.preventDefault();
    };
    // Moves to account page with current user info
    const openAccount = async event => {
        event.preventDefault();
        localStorage.setItem('current_account', userId);
        window.location.href = '/account';
    };
    const openGroup = event => //Needs to be changed to work with dropdown menu to select active group
    {
        event.preventDefault();
    };

    const updateMovies = async event => {
      event.preventDefault();
      try {   
              var moviesBody = JSON.stringify({});
              const response = await fetch(buildPath('api/UpdateMovies'), {
                  method:'POST',body:moviesBody,headers:{
                      'Content-Type': 'application/json'
                  }
              });
          } catch(e) {
              alert(e.toString());
              return;
        } 
    };

    return(
        <div style={{top:0}}>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
            <Link className="nav-link" to={"/"}>Cinemates</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" onClick={openNotifications}>Notifications</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" onClick={openSettings}>Settings</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" onClick={doLogout}>Log Out</Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        </div>
    );
}

export default MainHeader;
