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

function Group() {
    return(
        <div>
            <div id="Group">
                <h1 id="title">Group</h1>
            </div>
        </div>
   );
}

export default Group;
