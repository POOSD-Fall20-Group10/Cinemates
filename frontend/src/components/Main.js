import React from 'react';
import MainHeader from './MainHeader';
import Gallery from './Gallery';
import GroupsList from './GroupsList';
import MoviesList from './MoviesList'
import {Helmet} from "react-helmet";
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
            window.location.reload(false);
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
            <Helmet>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            </Helmet>
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
            <div id='moviesDiv' >
            <MoviesList />
            </div>
            <div id="tempAddGroupDiv">
            <div class="container">
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#form">
                Add New Group
            </button>  
                <div>
                <div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title" id="exampleModalLabel">Create Account</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div>
                    <form onSubmit={addGroup}>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="groupname">Group Name</label>
                                <input type="text" class="form-control" id="group-name" aria-describedby="group-name" placeholder="Enter group name" ref={(c) => addGroupName = c}></input>
                                <small id="group-name" class="form-text text-muted">Name your group</small>
                            </div>
                            <div class="form-group">
                                <label for="group-description">Group Description</label>
                                <input type="text" class="form-control" id="group-description" aria-describedby="group-description" placeholder="Enter group description" ref={(c) => addGroupDescription = c}></input>
                                <small id="group-description" class="form-text text-muted">Describe your group</small>
                            </div>
                        </div>
                        <div class="modal-footer border-top-0 d-flex justify-content-center">
                        <button type="submit" class="btn btn-success" onClick={addGroup}>Submit</button>
                        </div>
                    </form>
                </div>
                </div>
                </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Main;
