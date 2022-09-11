import React, { useState, useEffect } from "react";
import "./PostPage.css";
import axios from "axios";
import {useParams} from "react-router-dom"


const PostPage = () => {
    const {postId} = useParams();
    const [post, setPost] = useState({
        id: null,
        title: null,
        body: null
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        axios({
            method: "GET",
            url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
            signal: controller.signal
        }).then(response => {
            console.log(response.data)
            setLoading(false);
            setPost({
                id: response.data.id,
                title: response.data.title,
                body: response.data.body
            });
        }).catch(err => {
            setLoading(false);
            setError("Something went wrong!")
        })
        return () => {
            controller.abort();
        }
    }, [])

    if (error) return <p className="error">{error}</p>
    return (
        <div className="post-page">
            {loading &&
                <h1>It's loading</h1>
            }
            {!loading &&
                <div>
                    <ul>
                        <li>
                            ID: {post.id}
                        </li>
                        <li>
                            Title: {post.title}
                        </li>
                        <li>
                            Body: {post.body}
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default PostPage;