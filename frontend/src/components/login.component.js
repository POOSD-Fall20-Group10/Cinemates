import React, { useState } from "react";

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

         return (
            <div>
                <form onSubmit={doLogin}>
                    <h3>Login</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" id="loginName" placeholder="Enter username" ref={(c) => loginName = c}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="loginPassword" placeholder="Enter password" ref={(c) => loginPassword = c}/>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block" id="loginButton" onClick={doLogin}>Sign in</button>
                </form>
                <span id="loginResult">{message}</span>
            </div>
        );
    }
    
    export default Login;
