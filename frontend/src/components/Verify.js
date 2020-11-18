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
  const doVerify = async event => {
    const authResult = new URLSearchParams(window.location.search);
    const token = authResult.get('token');

    try {
            const response = await fetch(buildPath('Verify?token='+token));
           const data = await response.json();
            if(data.success){
              alert("verified");
            }
            else{
              alert("not verified");
            }
        }
    catch(e)
    {
        alert(e.toString());
        return;
    }
  }
  return (
    <div id="mainDiv">
      <button type="button" class="buttons" onClick={doVerify}> Test</button>
    </div>);
}

export default Verify;
