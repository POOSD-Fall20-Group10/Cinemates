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

        const resetPassword = async event => {
            event.preventDefault();
            if(resPassword.value == confirm.value)
            {
                var obj = {token:token,email:resEmail,login:resLogin,
                    password:CryptoJS.MD5(resPassword.value).toString(),firstName:resFName,lastName:resLName};;
                var js = JSON.stringify(obj);

                try {    
                    const response = await fetch(buildPath('api/EditUser'), {
                        method:'POST',body:js,headers:{
                            'Content-Type': 'application/json'
                        }
                    });

                var res = JSON.parse(await response.text());
               
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
