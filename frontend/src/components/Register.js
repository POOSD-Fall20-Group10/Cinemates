import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import RegisterHeader from "./RegisterHeader";
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
    var regLogin;
    var regFName;
    var regLName;
    var regPassword;
    var regConfirm;
    var regEmail;

    const [message,setMessage] = useState('');

    const doRegister = async event => 
    {
        event.preventDefault();

        if(regLogin.value && regFName.value && regLName.value && regPassword.value && regConfirm.value && regEmail.value)
        {
            if(regPassword.value == regConfirm.value)
            {

                var obj = {email:regEmail.value,login:regLogin.value,
                    password:regPassword.value,firstName:regFName.value,lastName:regLName.value,isVerified:false};
                var js = JSON.stringify(obj);

                try
                {    
                    const response = await fetch(buildPath('api/AddUser'),
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                    var res = JSON.parse(await response.text());

                    setMessage('');
                    window.location.href = '/';
                }
                catch(e)
                {
                    setMessage('Could Not Create User');
                    return;
                }
            }
            else
            {
                setMessage('Passwords do not match');
            }
        }
        else
        {
            setMessage('Please Fill Out All Forms');
        }
    };

    return(
        <div><div><RegisterHeader></RegisterHeader></div>
    <div>
        <Helmet>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
        </Helmet>
    <div id="regDiv">
            <form onSubmit={doRegister}>
                <h3>Register</h3>
                <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                    <label>Username</label>
                    <input type="text" className="form-control" id="regLogin" placeholder="Username" ref={(c) => regLogin = c}/>
                </div>

                <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                    <label>First name</label>
                    <input type="text" className="form-control" id="regFName" placeholder="First Name" ref={(c) => regFName = c}/>
                </div>

                <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                    <label>Last name</label>
                    <input type="text" className="form-control" id="regLName" placeholder="Last Name" ref={(c) => regLName = c}/>
                </div>

                <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                    <label>Email</label>
                    <input type="email" className="form-control" id="regEmail" placeholder="Email" ref={(c) => regEmail = c}/>
                </div>

                <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                    <label>Password</label>
                    <input type="password" className="form-control" id="regPassword" placeholder="Password" ref={(c) => regPassword = c}/>
                </div>

                <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                    <label>Password</label>
                    <input type="password" className="form-control" id="regConfirm" placeholder="Confirm Password" ref={(c) => regConfirm = c}/>
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={doRegister}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
                <span id="regResult">{message}</span>
            </form>
        </div>
        </div>
        </div>
    );
};

export default Register;