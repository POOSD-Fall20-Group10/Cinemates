import React, { useState } from 'react';
import './Login.css';

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

function Login() {
    var loginName;
    var loginPassword;
    const [message, setMessage] = useState('');

    const doLogin = async event => {
        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try {    
            const response = await fetch(buildPath('api/UserLogin'), {
                method:'POST',body:js,headers:{
                    'Content-Type': 'application/json'
                }
            });

        var res = JSON.parse(await response.text());
        if (res.id <= 0) {
            setMessage('User/Password combination incorrect');
        } else {
            var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
            localStorage.setItem('user_data', JSON.stringify(user));
            setMessage('');
            window.location.href = '/main';
          }
        } catch(e) {
            alert(e.toString());
            return;
          }    
    };

    return(
      <div id="loginDiv" className="Login">
         <form onSubmit={doLogin}>
          <div className="input-container">
          <input type="text" id="loginName" placeholder="Username"
          ref={(c) => loginName = c} />
          <i class="zmdi zmdi-account zmdi-hc-lg"></i>
          </div>

          <div className="input-container">
          <input type="password" id="loginPassword" placeholder="Password"
          ref={(c) => loginPassword = c} />
          <i class="zmdi zmdi-lock zmdi-hc-lg"></i>
          </div>

          <input type="submit" id="loginButton" class="buttons" value = "Login"
          onClick={doLogin} />

          <input type="submit" id="registerButton" class="buttons" value = "Register"
          onClick={doRegisterButton} />

         </form>
        <span id="loginResult">{message}</span>
      </div>
    );
}

export default Login;
