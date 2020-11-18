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

    const fetchAccount = async event => {
        event.preventDefault();
        var obj = {userID:curAccount};
        var js = JSON.stringify(obj);

        //API call
        try {
                const response = await fetch(buildPath('api/GetUserByID'), {
                    method:'POST',body:js,headers:{
                        'Content-Type': 'application/json'
                    }
                });

                curAccountInfo = JSON.parse(await response.text()); // Response text
                var div = document.getElementById("accountNameDiv"); // Account name Div
                div.innerHTML = curAccountInfo.login; // Adds Account name to div
                div = document.getElementById("accountFirstLast"); // Account F/L name Div
                div.innerHTML = curAccountInfo.firstName + " " + curAccountInfo.lastName; // Adds F/L name to div
            }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
        <div>
            <div id="Account">
                <h1 id="title">Account</h1>
                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={fetchAccount}>FetchAccount</button>
            </div>
            <div id="accountNameDiv">
            </div>
            <div id="accountFirstLast">
            </div>
        </div>
   );
}

export default Account;
