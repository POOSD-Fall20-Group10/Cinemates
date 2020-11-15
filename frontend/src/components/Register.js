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
    <div id="regDiv">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
            <form onSubmit={doRegister}>
            <div class="row">
            <div class="col-6">
                <div class="form-group row">
                    <label for="fname" class="col-sm-6 col-form-label">First Name</label>
                    <div class="col-sm-6">
                    <input type="text" className="form-control" id="regFName" placeholder="First Name" ref={(c) => regFName = c}/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="lname" class="col-sm-6 col-form-label">Last Name</label>
                    <div class="col-sm-6">
                    <input type="text" className="form-control" id="regLName" placeholder="Last Name" ref={(c) => regLName = c}/>
                    </div>
                </div>

              
                <div class="form-group row">
                    <label for="lname" class="col-sm-6 col-form-label">Username</label>
                    <div class="col-sm-6">
                    <input type="text" className="form-control" id="regLogin" placeholder="Username" ref={(c) => regLogin = c}/>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <div class="form-group row">
                    <label for="email" class="col-sm-6 col-form-label">Email</label>
                    <div class="col-sm-6">
                    <input type="email" className="form-control" id="regEmail" placeholder="Email" ref={(c) => regEmail = c}/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="password" class="col-sm-6 col-form-label">Password</label>
                    <div class="col-sm-6">
                    <input type="password" className="form-control" id="regPassword" placeholder="Password" ref={(c) => regPassword = c}/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="password2" class="col-sm-6 col-form-label">Confirm Password</label>
                    <div class="col-sm-6">
                    <input type="password" className="form-control" id="regConfirm" placeholder="Confirm Password" ref={(c) => regConfirm = c}/>
                    </div>
                </div>
            </div>

            </div>
            <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={doRegister}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
                <span id="regResult">{message}</span>
            </form>
            </div>
        </div>


        
    );
};

export default Register;