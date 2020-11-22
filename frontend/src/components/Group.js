import React from 'react';
import GroupMoviesList from './GroupMoviesList'

const app_name = 'cine-mates'
function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
}

var groupId;
var groupName;
var groupDescription;
var members;

//Edit Group variables
var editGroupName;
var editGroupDescription;
var addMemberId;

const openAddMemberForm = event => // Needs to open add member form
    {
    event.preventDefault();
    };
const doAddMember = event => // Needs to Take in userID to add and make API call
    {
    event.preventDefault();
    };
const openEditGroupForm = event => // Needs to open Edit Group form
    {
    event.preventDefault();
    };
const doEditGroup = event => // Needs to make API call and Replace localstorage with new info
    {
    event.preventDefault();
    };

function Group() {

    var _gd = localStorage.getItem('group_info');
    var gd = JSON.parse(_gd);
    groupId = gd._id;
    groupName = gd.name;
    groupDescription = gd.description;
    members = gd.members;

    return(
        <div>
            <div id="groupInfo">
                <h1 id="groupName">{groupName}</h1>
                <h3 id="groupDescription">{groupDescription}</h3>
                <div id="memberButtons">
                </div>
                <button type="button" id="addMemberButton" class="buttons" onClick={openAddMemberForm}> Add Member </button>
                <button type="button" id="editGroupButton" class="buttons" onClick={openEditGroupForm}> Edit Group </button>
            </div>
            <div id='groupMoviesDiv' >
                <GroupMoviesList />
            </div>
            <div id="tempEditGroupDiv">
                <div class="container">
                    <form onSubmit={doEditGroup}>
                        <h3>Edit Group</h3>
                        <div className="form-group">
                            <label>Group Name</label>
                            <input type="text" className="form-control" id="addGroupName" placeholder={groupName} ref={(c) => editGroupName = c}/>
                        </div>

                        <div className="form-group">
                            <label>Group Description</label>
                            <input type="text" className="form-control" id="addGroupDescription" placeholder={groupDescription} ref={(c) => editGroupDescription = c}/>
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={doEditGroup}>Edit Group</button>
                    </form>
                </div>
            </div>
        </div>
   );
}

export default Group;
