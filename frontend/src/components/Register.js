import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div id="regDiv">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
            <Link className="navbar-brand" to={"/"}>Login</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={"/"}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Sign up</Link>
                </li>
                </ul>
            </div>
            </div>
            </nav>
            <form onSubmit={doRegister}>
                <h3>Register</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" id="regLogin" placeholder="Username" ref={(c) => regLogin = c}/>
                </div>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" id="regFName" placeholder="First Name" ref={(c) => regFName = c}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" id="regLName" placeholder="Last Name" ref={(c) => regLName = c}/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" id="regEmail" placeholder="Email" ref={(c) => regEmail = c}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="regPassword" placeholder="Password" ref={(c) => regPassword = c}/>
                </div>

                <div className="form-group">
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
    );
};

export default Register;