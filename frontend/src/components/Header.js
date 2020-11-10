import React from 'react';
const app_name = 'cine-mates'

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    } else {
        return 'http://localhost:5000/' + route;
    }
}

function Header()
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
    const openAccount = event => //Needs to send to Account page
    {
        event.preventDefault();
    };
    const openGroup = event => //Needs to be changed to work with dropdown menu to select active group
    {
        event.preventDefault();
        alert('Needs dropdown not button');
    };

    const updateMovies = async event => {
      event.preventDefault();
      var res;
      try {    
      const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ce41792ee6b56545a5a67c7e6705976c&language=en-US&page=1&region=US', {
          method:'GET',body:null,headers:{
              'Content-Type': 'application/json',
          }
      });

       res = JSON.parse(await response.text());
      } catch(e) {
        alert(e.toString());
        return;
      }  
      try {    
              var movies = JSON.stringify({"movies": res.results});
              const response2 = await fetch(buildPath('api/UpdateMovies'), {
                  method:'POST',body:movies,headers:{
                      'Content-Type': 'application/json'
                  }
              });

          var res2 = JSON.parse(await response2.text());
          } catch(e) {
              alert(e.toString());
              return;
        } 
    };

    return(
        <div id="headerDiv">
            <button type="button" id="AccountButton" class="buttons" onClick={openAccount}> {login} </button>
            <button type="button" id="GroupSelector" class="buttons" onClick={openGroup}> Group </button>
            <button type="button" id="notificationsButton" class="buttons" onClick={openNotifications}> Notifications </button>
            <button type="button" id="settingsButton" class="buttons" onClick={openSettings}> Settings </button>
            <button type="button" id="logoutButton" class="buttons" onClick={doLogout}> Log Out </button>
            <button type="button" id="updateMovieButton" class="buttons" onClick={updateMovies}>Update Movies</button>
        </div>
    );
};

export default Header;
