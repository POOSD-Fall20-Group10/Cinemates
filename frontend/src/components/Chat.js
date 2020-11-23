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

var chatLog;
var token;
var groupId;
var messageToSend;
var userId;

const sendMessage = async event =>
{
    event.preventDefault();

    var obj = {token:token,groupID:groupId,userID:userId,message:messageToSend.value};
    var js = JSON.stringify(obj);

    //API call
    try {
            const response = await fetch(buildPath('api/MessageGroup'), {
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

function Chat() {

    var _gd = localStorage.getItem('group_info');
    var gd = JSON.parse(_gd);
    groupId = gd._id;

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    userId = ud.id;
    token = ud.token;

    var obj = {token:token, groupID:groupId};
    var js = JSON.stringify(obj);

    // API Call
    var xhr = new XMLHttpRequest();
    xhr.open("POST", buildPath('api/ListGroupMessages'), false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
            xhr.send(js);

            var ret = JSON.parse(xhr.responseText);
            chatLog = ret.messages;
        }
    catch(e)
    {
        alert(e.toString());
        return;
    }

    return(
        <div id="chat">
            <h1 id="chatTitle">Chat</h1>
            <h3 id="chatTitle">{chatLog}</h3>
            <input type="text" class="form-control" id="messageToSend" placeholder="Write Your Message" ref={(c) => messageToSend = c}></input>
            <button type="submit" class="btn btn-success" onClick={sendMessage}>Send</button>
        </div>
   );
}

export default Chat;
