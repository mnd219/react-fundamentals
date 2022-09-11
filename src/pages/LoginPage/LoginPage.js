import React from "react";
import Login from "../../components/Login/Login";
import "./LoginPage.css";


const LoginPage = ({token}) => {
    return (
        <div>
            { token &&
                <p className="login-success">Login successfully!</p>
            }
            { !token &&
                <Login />
            }
        </div>
    )
}

export default LoginPage;