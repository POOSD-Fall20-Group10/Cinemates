import React, { useState } from "react";
import '../bootstrap.min.css';

const app_name = 'cine-mates'

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    } else {
        return 'http://localhost:5000/' + route;
    }
}

var user;

    function Reset() {

        var CryptoJS = require("crypto-js");
        const authResult = new URLSearchParams(window.location.search);
        const token = authResult.get('token')
        const [message, setMessage] = useState('');

        var resPassword;
        var confirm;
        var resEmail;
        var resLogin;
        var resFName;
        var resLName;
        var resID;

    var js = JSON.stringify({token: token});
    var xhr = new XMLHttpRequest();
    xhr.open("POST",buildPath('api/Reset'),false);
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
    try {
          xhr.send(js);
            const response = JSON.parse(xhr.responseText);
            if(response.success){
              resEmail = response.userInfo.email;
              resLogin = response.userInfo.login;
              resFName = response.userInfo.firstName;
              resLName = response.userInfo.lastName;
              resID = response.userInfo._id;
            }
            else{
              alert("verify failed");
                setTimeout(function() {
                  window.location.href = '/login';
                },
                3000);
            }
          }
          catch(e){
            alert(e.toString());
            return;
          }

        const resetPassword = async event => {
            event.preventDefault();
            if(resPassword.value == confirm.value)
            {
                var obj = {token:token,email:resEmail,login:resLogin, userID: resID,
                    password:CryptoJS.MD5(resPassword.value).toString(),firstName:resFName,lastName:resLName};;
                var js = JSON.stringify(obj);

                try {    
                    const response = await fetch(buildPath('api/EditUser'), {
                        method:'POST',body:js,headers:{
                            'Content-Type': 'application/json'
                        }
                    });

                var res = JSON.parse(await response.text());
                if(! res.error){
                window.location.href = '/login';
                }
                else{
                  alert(res.error);
                }
                } catch(e) {
                    alert(e.toString());
                    return;
                  }
            }
            else
            {
                setMessage("Passwords Don't Match");
            }
        };

         return (
            <div>
                <form onSubmit={resetPassword}>
                    <div className="form-group">
                        <label>Enter Your New Password</label>
                        <input type="password" className="form-control" placeholder="Enter Password" ref={(c) => resPassword = c}/>
                    </div>

                    <div className="form-group">
                        <label>Confirm Passord</label>
                        <input type="password" className="form-control" placeholder="Confirm password" ref={(c) => confirm = c}/>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block" id="loginButton" onClick={resetPassword}>Reset</button>
                </form>
                <span id="loginResult">{message}</span>
            </div>
        );
    }

    export default Reset;
