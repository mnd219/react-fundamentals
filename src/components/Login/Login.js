import React from 'react';
import './Login.css';

const Login = () => {

    const handleSubmit = (e) => {
        localStorage.setItem('token', "123455");
    }

    return(
        <div>
            <h1>Please Log In</h1>
            <form action="#">
                <div className="field-group">
                    <input type="email" placeholder="Email" name="email" required/>
                </div>
                <div className="field-group">
                    <input type="password" placeholder="Password" name="password" required/>
                </div>
                <div className="field-group">
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;