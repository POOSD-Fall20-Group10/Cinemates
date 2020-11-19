import React from 'react';
import MainHeader from './MainHeader';
import Gallery from './Gallery';
import GroupsList from './GroupsList';
import MoviesList from './MoviesList'
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

//Add Group variables
var addGroupName;
var addGroupDescription;

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
            <div id='moviesDiv' >
            <MoviesList />
            </div>
        </div>

        </div>
    );
}

export default Main;
