import React, { useState } from "react";
import LoginHeader from './LoginHeader';
const app_name = 'cine-mates'

const doRegisterButton = event => {
    event.preventDefault();
    window.location.href = '/register';
};   

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    } else {
        return 'http://localhost:5000/' + route;
    }
}

var user;

// Resend EmailVerification
const resendEmail = async event => {
    event.preventDefault();
    var obj = {email:user.email};
    var js = JSON.stringify(obj);

    //API call
    try {
            const response = await fetch(buildPath('api/EmailVerification'), {
                method:'POST',body:js,headers:{
                    'Content-Type': 'application/json'
                }

            });

            var div = document.getElementById("verifyDiv"); // The div being modified
            var temp = document.createElement("text");
            temp.innerHTML = "Email Sent";
            div.appendChild(temp); // Adds text to the div
        }
    catch(e)
    {
        alert(e.toString());
        return;
    }
};

    function Login() {
        var loginName;
        var loginPassword;
        const [message, setMessage] = useState('');

        var CryptoJS = require("crypto-js");

        const doLogin = async event => {
            event.preventDefault();
            var obj = {login:loginName.value,password:CryptoJS.MD5(loginPassword.value).toString()};
            var js = JSON.stringify(obj);

            try {    
                const response = await fetch(buildPath('api/UserLogin'), {
                    method:'POST',body:js,headers:{
                        'Content-Type': 'application/json'
                    }
                });

            var res = JSON.parse(await response.text());
            if (res.error) {
                setMessage(res.error);
            } else {
                user = {firstName:res.firstName,lastName:res.lastName,id:res.id,login:res.login,email:res.email}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                if(res.isVerified)
                {
                    window.location.href = '/main';
                }
                else // Not Verified
                {
                    setMessage('Your Account Has Not Been Verified. Please Click The Link In The Email We Sent To Verify Your Account.');
                    // Adds button to Resend to Screen
                    var div = document.getElementById("verifyDiv");
                    div.innerHTML += "Click Here to Resend The Email";
                    var temp = document.createElement('button');
                    temp.type = "submit";
                    temp.className = "btn btn-dark btn-lg btn-block";
                    temp.id = "resendButton";
                    temp.innerHTML = "Resend";
                    temp.addEventListener("click", resendEmail);
                    div.appendChild(temp);
                }
              }
            } catch(e) {
                alert(e.toString());
                return;
              }    
        };

         return (
            <div>
                <LoginHeader></LoginHeader>
                <form onSubmit={doLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" id="loginName" placeholder="Enter username" ref={(c) => loginName = c}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="loginPassword" placeholder="Enter password" ref={(c) => loginPassword = c}/>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block" id="loginButton" onClick={doLogin}>Sign In</button>
                </form>
                <span id="loginResult">{message}</span>
                <div id='verifyDiv'>
                </div>
            </div>
        );
    }

    export default Login;
