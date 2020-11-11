import React/*, { useState }*/ from 'react';
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
var groupList;
var movieList;

//Add Group variables
var addGroupName;
var addGroupDescription;

function Main() {

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    userId = ud.id;
    login = ud.login;

    return(
    <div>
        <div id="mainDiv">
            <div id="moviesDiv">
            <button type="button" id="moviesTest" class="buttons" onClick={loadMovies}> Get Movies </button>
            </div>
            <div id="groupsDiv">
                <button type="button" id="GroupTest" class="buttons" onClick={loadGroups}> Get Groups </button>
            </div>
        </div>
        <div id="tempAddGroupDiv">
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
    );
}

const loadGroups = async event => {
    event.preventDefault();
    var obj = {userId:userId};
    var js = JSON.stringify(obj);

    try {
            const response = await fetch(buildPath('api/ListGroups'), {
                method:'POST',body:js,headers:{
                    'Content-Type': 'application/json'
                }
            });

            groupList = JSON.parse(await response.text());
            alert(groupList);

        }
    catch(e)
    {
        alert(e.toString());
        return;
    }
};

const loadMovies = async event => {
    event.preventDefault();
    var obj = {userId:userId};
    var js = JSON.stringify(obj);

    try {
            const response = await fetch(buildPath('api/ListGroups'), {
                method:'POST',body:js,headers:{
                    'Content-Type': 'application/json'
                }
            });

            movieList = JSON.parse(await response.text());
            alert(movieList);

        }
    catch(e)
    {
        alert(e.toString());
        return;
    }
};

const addGroup = async event => {
    event.preventDefault();
    var membersArray = [userId];
    var obj = {name:addGroupName.value,description:addGroupDescription.value,members:membersArray};
    var js = JSON.stringify(obj);

    try {
            const response = await fetch(buildPath('api/ListGroups'), {
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

export default Main;
