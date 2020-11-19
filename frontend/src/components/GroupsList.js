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
var groupList;

// divs to be filled out onload and added to page
var GroupsDiv;

//Add Group variables
var addGroupName;
var addGroupDescription;

// Takes what is in groupList and adds them to groupsDiv
function createGroupList()
{
    // the loop
  let children = groupList.groups.map((val, index) => {
    return (
      React.createElement("button", {id: index, onClick: () =>openPage(val)}, val.name)
    )
  })
  // the div with children inside
    GroupsDiv =  React.createElement("div", {className: "contexCon"},children);
}

function openPage(group)
{
  localStorage.setItem("group_info",JSON.stringify(group));
  alert(localStorage.getItem("group_info"));
  window.location.href = '/group'
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

function GroupsList() {

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
	xhr.open("POST", buildPath('api/ListGroups'), false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
            xhr.send(js);

            groupList = JSON.parse(xhr.responseText); // Adds response to groupList
            createGroupList();
        }
    catch(e)
    {
        alert(e.toString());
        return;
    }
    return(
        <div>
        {GroupsDiv}
        </div>
    );
}

export default GroupsList;
