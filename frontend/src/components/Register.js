import React, { useState } from 'react';
const app_name = 'cine-mates'
function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    } else {
        return 'http://localhost:5000/' + route;
    }
}

const doGoBackButton = event => {
    event.preventDefault();
    window.location.href = '/';
};

function Register(){
    var regLogin;
    var regFName;
    var regLName;
    var regPassword;
    var regConfirm;
    var regEmail;
    var userID = '2';

    const [message,setMessage] = useState('');
    const doRegister = async event => {
        event.preventDefault();
        if (regLogin.value && regFName.value && regLName.value && regPassword.value && regConfirm.value && regEmail.value) {
            if (regPassword.value == regConfirm.value) {

                var obj = {
                    userID:userID,
                    email:regEmail.value,
                    login:regLogin.value,
                    password:regPassword.value,
                    firstName:regFName.value,
                    lastName:regLName.value
                };

                var js = JSON.stringify(obj);

                try {    
                    const response = await fetch(buildPath('api/AddUser'), {
                        method:'POST',
                        body:js,
                        headers: {'Content-Type': 'application/json'}
                    });

                    var res = JSON.parse(await response.text());
                    window.location.href = '/';
                    setMessage('');
                } catch(e) {
                    setMessage('Could Not Create User');
                    return;
                }
            } else {
                setMessage('Passwords do not match');
            }
        } else {
            setMessage('Please Fill Out All Forms');
        }
    };

    return(
    <div id="regDiv">
        <form onSubmit={doRegister}>
            <span id="inner-title">Create New User</span><br />
            <input type="text" id="regLogin" placeholder="Username"
                ref={(c) => regLogin = c} />
            <input type="text" id="regFName" placeholder="First Name"
                ref={(c) => regFName = c} />
            <input type="text" id="regLName" placeholder="Last Name"
                ref={(c) => regLName = c} />
            <input type="password" id="regPassword" placeholder="Password"
                ref={(c) => regPassword = c} />
            <input type="password" id="regConfirm" placeholder="Confirm Password"
                ref={(c) => regConfirm = c} />
            <input type="text" id="regEmail" placeholder="Email"
                ref={(c) => regEmail = c} />
            <input type="submit" id="regButton" class="buttons" value = "Register"
                onClick={doRegister} />
            <input type="submit" id="goBackButton" class="buttons" value = "Go Back"
                onClick={doGoBackButton} />
        </form>
        <span id="regResult">{message}</span>
    </div>
    );
}

export default Register;
