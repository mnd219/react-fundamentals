import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import axios from "axios";
import Login from "../../components/Login/Login";


const ProfilePage = ({token}) => {
    const [user, setUser] = useState({
        name: null,
        id: null
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        axios({
            method: "GET",
            url: `https://60dff0ba6b689e001788c858.mockapi.io/users/3`,
            signal: controller.signal
        }).then(response => {
            setLoading(false);
            setUser({
                name: response.data.name,
                id: response.data.id
            });
        }).catch(err => {
            setLoading(false);
            setError("Something went wrong!")
        })
        return () => {
            controller.abort();
        }
    }, [])

    if (!token) return (
        <div>
            <h3>You need to login to continue</h3>
            <Login />
        </div>
    )
    if (error) return <p className="error">{error}</p>
    return (
        <div className="post-page">
            {loading &&
                <h1>It's loading</h1>
            }
            {!loading &&
                <div>
                    <h3>Profile</h3>
                    <ul>
                        <li>
                            Name: {user.name}
                        </li>
                        <li>
                            UserID: {user.id}
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default ProfilePage;