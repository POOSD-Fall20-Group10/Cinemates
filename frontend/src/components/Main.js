import React from 'react';
import MainHeader from './MainHeader';
import Gallery from './Gallery';
import GroupsList from './GroupsList';
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

// User info
var userId;
var login;
var token;

// Will contain info from the API calls
var groupList;
var movieList;

// divs to be filled out onload and added to page
var GroupsDiv;
var MoviesDiv;

//Add Group variables
var addGroupName;
var addGroupDescription;

// Takes what is in movieList and adds them to moviesDiv
function createMovieList()
{
    var i;
    var div = document.createElement('div'); // Creates new div
    div.innerHTML = "Movie List"; // Header


    for(i = 0; i < movieList.movies.length; i++)
    {
        var temp = document.createElement("button"); // Creates new button
        temp.innerHTML = movieList.movies[i].title; // Adds movie title to button
        div.appendChild(temp); // Adds button the div
        MoviesDiv = div; // sets moviesDiv
    }
}

// Takes what is in groupList and adds them to groupsDiv
function createGroupList()
{
    var i;
    var div = document.createElement('div'); // Creates new div
    div.innerHTML = "Group List"; // Header


    for(i = 0; i < groupList.groups.length; i++)
    {
        var temp = document.createElement("button"); // Creates new button
        temp.innerHTML = groupList.groups[i].name; // Adds group name to button
        div.appendChild(temp); // Adds button the div
    }
    var temp = document.createElement("button"); // Creates new button
    temp.innerHTML = "Create New Group"; // Create New Group Button, NEEDS TO OPEN FORM
    div.appendChild(temp); // Adds button the div
    GroupsDiv = div; // sets groupsDiv
}

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
            <div>&nbsp;&nbsp;</div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Gallery></Gallery>
            <div id="mainDiv">
            </div>
            <GroupsList />
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
