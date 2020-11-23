import React from 'react';
import MainHeader from './MainHeader';
import Gallery from './Gallery';

const app_name = 'cine-mates'
function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
}

// User info
var userId;
var login;
var token;

// Will contain info from the API calls
var moviesList;

// divs to be filled out onload and added to page
var MoviesDiv;

// Takes what is in movieList and adds them to moviesDivs
function createMoviesList()
{
  let children = moviesList.movies.slice(0, 70).map((val, index) => {
    return (
      React.createElement("button", {id: index, onClick: () =>openPage(val)}, val.title)
    )
  })
  // the div with children inside
    MoviesDiv =  React.createElement("div", {className: "contexCon"},children);
}

//save movie info to local storage and redirect to the movie page
function openPage(movie)
{
  localStorage.setItem("movie_info",JSON.stringify(movie));
  window.location.href = '/movie';
}

function MoviesList() {

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    userId = ud.id;
    login = ud.login;
    token = ud.token;

    //Get Groups
    var obj = {token:token,userID:userId};
    var js = JSON.stringify(obj);

    // API Call
    var xhr = new XMLHttpRequest();
	xhr.open("POST", buildPath('api/GetMovies'), false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
            xhr.send(js);

            moviesList = JSON.parse(xhr.responseText); // Adds response to moviesList
            createMoviesList();
        }
    catch(e)
    {
        alert(e.toString());
        return;
    }
    return(
        <div>
        {MoviesDiv}
        </div>
    );
}

export default MoviesList;
