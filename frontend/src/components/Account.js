import React from 'react';
import Card from "react-bootstrap/Card";

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
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <Card style={{ width: '80rem' }}>
            <Card.Body>
                <Card.Text>Account</Card.Text>
                <Card.Text>{curAccountInfo.login}</Card.Text>
                <Card.Text>{name}</Card.Text>
                <Card.Text> User Code: {curAccount}</Card.Text>
            </Card.Body>
            </Card>
        </div>
   );
}

export default Account;
