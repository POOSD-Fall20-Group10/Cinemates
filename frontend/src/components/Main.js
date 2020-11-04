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


function Main() {
    return(
    <div id="mainDiv">
    </div>
    );
}

export default Main;
