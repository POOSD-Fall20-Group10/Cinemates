import React, { useState } from 'react';
const app_name = 'cine-mates'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production')
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {
        return 'http://localhost:5000/' + route;
    }
}

const doGoBackButton = event => 
{
    event.preventDefault();

    window.location.href = '/';

};  

function Register()
{
    var regName;
    var regPassword;
    var regConfirm;
    var regEmail;

    const [message,setMessage] = useState('');

const doRegister = async event => 
    {
        event.preventDefault();

        setMessage('RegTest');
    };

    return(
    <div id="regDiv">
        <form onSubmit={doRegister}>
            <span id="inner-title">Fill Out The Fields</span><br />
            <input type="text" id="regName" placeholder="Username"
                ref={(c) => regName = c} />
            <input type="password" id="regPassword" placeholder="Password"
                ref={(c) => regPassword = c} />
            <input type="password" id="regConfirm" placeholder="Confirm Password"
                ref={(c) => regConfirm = c} />
            <input type="text" id="regEmail" placeholder="Email"
                ref={(c) => regPassword = c} />
            <input type="submit" id="regButton" class="buttons" value = "Register"
                onClick={doRegister} />
            <input type="submit" id="goBackButton" class="buttons" value = "Go Back"
                onClick={doGoBackButton} />
        </form>
        <span id="regResult">{message}</span>
    </div>
    );
};

export default Register;
