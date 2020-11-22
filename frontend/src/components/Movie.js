import React from 'react';

const app_name = 'cine-mates'
function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
}

var movieId;
var userId
var token;

const voteYes = event => //Needs to open notification window
    {
    event.preventDefault();
    };

const voteNo = event => //Needs to open notification window
    {
    event.preventDefault();
    };

function Movie() {

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    userId = ud.id;
    token = ud.token;

    var _md = localStorage.getItem('movie_info');
    var md = JSON.parse(_md);
    var title = md.title;
    var overview = md.overview;
    var releaseDate = md.release_date;
    var score = md.vote_average;
    movieId = md.id;

    return(
        <div>
            <div id="movieInfo">
            <h1 id="title">{title}</h1>
            <h3 id="overview">{overview}</h3>
            <h3 id="releaseDate">{releaseDate}</h3>
            <h3 id="score">{score}</h3>
            </div>
            <div id="vote">
                <button type="button" id="yesButton" class="buttons" onClick={voteYes}> Yes </button>
                <button type="button" id="noButton" class="buttons" onClick={voteNo}> No </button>
            </div>
        </div>
   );
}

export default Movie;
