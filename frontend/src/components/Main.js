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

var userId;
var login;
var token;

var groupList;
var movieList;

//Add Group variables
var addGroupName;
var addGroupDescription;

// Takes what is in movieList and adds them the to page
function createMovieList()
{
    var i;
    var div = document.getElementById("movieListDiv"); // The div being modified
    div.innerHTML = "Movie List"; // Header


    for(i = 0; i < movieList.movies.length; i++)
    {
        var temp = document.createElement("button"); // Creates new button
        temp.innerHTML = movieList.movies[i].title; // Adds movie title to button
        div.appendChild(temp); // Adds button the div
    }
}

// Takes what is in groupList and adds them the to page
function createGroupList()
{
    var i;
    var div = document.getElementById("groupListDiv"); // The div being modified
    div.innerHTML = "Group List"; // Header


    for(i = 0; i < groupList.groups.length; i++)
    {
        var temp = document.createElement("button"); // Creates new button
        temp.innerHTML = groupList.groups[i].name; // Adds group name to button
        div.appendChild(temp); // Adds button the div
    }
}

// Makes API call to retrieve all groups that the user {userId} belongs to.
//Then calls createGroupList()
const loadGroups = async event => {
    event.preventDefault();
    var obj = {token:token,userID:userId};
    var js = JSON.stringify(obj);

    //API call
    try {
            const response = await fetch(buildPath('api/ListGroups'), {
                method:'POST',body:js,headers:{
                    'Content-Type': 'application/json'
                }
            });

            groupList = JSON.parse(await response.text()); // Adds response to groupList
            createGroupList();
        }
    catch(e)
    {
        alert(e.toString());
        return;
    }
};

// Makes API call to retrieve all movies
//Then calls createMovieList()
const loadMovies = async event => {
    event.preventDefault();
    var obj = {page:1};
    var js = JSON.stringify(obj);

    // API call
    try {
            const response = await fetch(buildPath('api/GetMovies'), {
                method:'POST',body:js,headers:{
                    'Content-Type': 'application/json'
                }
            });

            movieList = JSON.parse(await response.text()); // Adds response to movieList
            createMovieList();
        }
    catch(e)
    {
        alert(e.toString());
        return;
    }
};

// Makes an AddGroup API call to create a new group with addGroupName and addGroupDescription
// Only member in the group is the current user
const addGroup = async event => {
    event.preventDefault();
    var membersArray = [{"userID" : userId, "yesList":[], "noList":[]}]; // current user
    var obj = {token:token,name:addGroupName.value,description:addGroupDescription.value,members:membersArray};
    var js = JSON.stringify(obj);

    //API call
    try {
            const response = await fetch(buildPath('api/AddGroup'), {
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
};

function Main() {

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    userId = ud.id;
    login = ud.login;
    token = ud.token;

    return(
        <div>
            <MainHeader></MainHeader>
            <Gallery></Gallery>
            <div id="mainDiv">
                <div id="moviesDiv">
                <button type="button" id="moviesTest" class="buttons" onClick={loadMovies}> Get Movies </button>
                </div>
                <div id="groupsDiv">
                    <button type="button" id="GroupTest" class="buttons" onClick={loadGroups}> Get Groups </button>
                </div>
            </div>
            <div id="movieListDiv">
            </div>
            <div id="groupListDiv">
            </div>
            <div id="tempAddGroupDiv">
            <div class="container">
                <form onSubmit={addGroup}>
                    <h3>Add Group</h3>
                    <div className="form-group">
                        <label>Group Name</label>
                        <input type="text" className="form-control" id="addGroupName" placeholder="Group Name" ref={(c) => addGroupName = c}/>
                    </div>

                    <div className="form-group">
                        <label>Group Description</label>
                        <input type="text" className="form-control" id="addGroupDescription" placeholder="Description" ref={(c) => addGroupDescription = c}/>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={addGroup}>Add Group</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Main;
