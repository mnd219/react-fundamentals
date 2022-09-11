import React from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";

const Navbar = ({token}) => {
    const handleLogOut = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/profile">Profile</Link>
            {token ? (
                <button onClick={handleLogOut}>Log Out</button>
            ) : (
                <Link to="login">Login</Link>
            )}
        </div>
    )
}

export default Navbar;
