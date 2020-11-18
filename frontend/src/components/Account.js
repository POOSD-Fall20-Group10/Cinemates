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

var curAccount;
var curAccountInfo;

function Account() {

    curAccount = localStorage.getItem('current_account');

    var obj = {userID:curAccount};
    var js = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
	xhr.open("POST", buildPath('api/GetUserByID'), false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
            xhr.send(js);

            curAccountInfo = JSON.parse(xhr.responseText); // Response text
            var name = curAccountInfo.firstName + " " + curAccountInfo.lastName;
        }
    catch(e)
    {
        alert(e.toString());
        return;
    }

    return(
        <div>
            <div id="Account">
                <h1 id="title">Account</h1>
            </div>
            <div id="accountNameDiv" >
                <h1 id="title">{curAccountInfo.login}</h1>
            </div>
            <div id="accountFirstLast">
                <h1 id="title">{name}</h1>
            </div>
        </div>
   );
}

export default Account;
