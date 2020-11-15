import React, { useState } from 'react';
import RegisterHeader from './RegisterHeader';
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
    <div>
    <RegisterHeader></RegisterHeader>
    <div id="regDiv">
            <form onSubmit={doRegister}>
                <div class="row">
                    <div class="col">
                        <label for="fname">First Name</label> 
                        <input type="text" className="form-control" id="regFName" placeholder="First Name" ref={(c) => regFName = c}/>
                        <label for="lname">Last Name</label> 
                        <input type="text" className="form-control" id="regLName" placeholder="Last Name" ref={(c) => regLName = c}/>
                        <label for="uname">Username</label> 
                        <input type="text" className="form-control" id="regLogin" placeholder="Username" ref={(c) => regLogin = c}/>
                    </div>
                    <div class="col">
                        <label for="email">Email</label> 
                        <input type="email" className="form-control" id="regEmail" placeholder="Email" ref={(c) => regEmail = c}/>
                        <label for="password">Password</label> 
                        <input type="password" className="form-control" id="regPassword" placeholder="Password" ref={(c) => regPassword = c}/>
                        <label for="password2">Confirm Password</label> 
                        <input type="password" className="form-control" id="regConfirm" placeholder="Confirm Password" ref={(c) => regConfirm = c}/>
                    </div>
                </div>
                <div>&nbsp;</div>
                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={doRegister}>Register</button>
                <p className="forgot-password text-right">
                    Already registered? <a href="#">log in</a>
                </p>
                <span id="regResult">{message}</span>
            </form>
            </div>
        </div>
    );
}

export default Register;