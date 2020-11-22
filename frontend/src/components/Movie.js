import React from 'react';
import Card from "react-bootstrap/Card";
import { Button } from 'reactstrap';
import '../bootstrap.min.css';

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
var groupIds;
var md;

const voteYes = async event => // Add movie to yes list and return to main
{
    event.preventDefault();
    var i;

    for(i = 0; i < groupIds.length; i++)
    {
        var obj = {token:token,groupID:groupIds[i],userID:userId,movieID:md,liked:true};
        var js = JSON.stringify(obj);

        //API call
        try {
                const response = await fetch(buildPath('api/AddMovieToList'), {
                    method:'POST',body:js,headers:{
                        'Content-Type': 'application/json'
                    }

                });
            }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }
    window.location.href = '/main';
};

const voteNo = async event => // Add movie to no list and return to main
{
    event.preventDefault();
    var i;

    for(i = 0; i < groupIds.length; i++)
    {
        var obj = {token:token,groupID:groupIds[i],userID:userId,movieID:md,liked:false};
        var js = JSON.stringify(obj);

        //API call
        try {
                const response = await fetch(buildPath('api/AddMovieToList'), {
                    method:'POST',body:js,headers:{
                        'Content-Type': 'application/json'
                    }

                });
            }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }
    window.location.href = '/main';
};

function Movie() {

    var i;
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    userId = ud.id;
    token = ud.token;

    var _md = localStorage.getItem('movie_info');
    md = JSON.parse(_md);
    var title = md.title;
    var overview = md.overview;
    var releaseDate = md.release_date;
    var score = md.vote_average;
    movieId = md.id;

    var _gd = localStorage.getItem('group_List');
    var gd = JSON.parse(_gd);
    groupIds = new Array();
    for(i = 0; i < gd.groups.length; i++)
    {
        groupIds.push(gd.groups[i]._id);
    }

    var imageUrl = "https://api.themoviedb.org/3/movie/" + {movieId} + "/images?" + "api_key=" + {token} + "&language=en-US";
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

            <Card style={{ width: '80rem' }}>
            <Card.Img variant="top" src={imageUrl}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{overview}</Card.Text>
                <Card.Text>{releaseDate}</Card.Text>
                <Card.Text>{score}</Card.Text>
                <Button variant="primary" onClick={voteYes}>Yes</Button>
                <Button variant="primary" onClick={voteNo}>No</Button>
            </Card.Body>
            </Card>
        </div>
   );
}

export default Movie;
