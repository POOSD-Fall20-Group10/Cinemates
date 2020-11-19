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

function Verify(){
    var status;
    const authResult = new URLSearchParams(window.location.search);
    const token = authResult.get('token');
    var js = JSON.stringify({token: token});
    var xhr = new XMLHttpRequest();
    xhr.open("POST",buildPath('api/Verify'),false);
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
    try {
          xhr.send(js);
            const response = JSON.parse(xhr.responseText);
            if(response.success){
              status = "Successfully Verified";
              setTimeout(function() {
                window.location.href = '/login';
              },
              3000);
            }
            else{
              status = "Verification Failed";
                setTimeout(function() {
                  window.location.href = '/login';
                },
                3000);
            }
    }
    catch(e)
    {
        alert(e.toString());
        return;
    }
    return (
    <div id="messageDiv">{status}
    </div>);
}

export default Verify;
