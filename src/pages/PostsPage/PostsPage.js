import React, { useState, useEffect } from "react";
import "./PostsPage.css";
import { Link } from "react-router-dom";
import axios from "axios";


const PostsPage = () => {
    const [posts, setPosts] = useState([])
    const [sortTitle, setSortTitle] = useState("None")
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        axios({
            method: "GET",
            url: "https://jsonplaceholder.typicode.com/posts",
            signal: controller.signal
        }).then(response => {
            setLoading(false);
            setPosts(response.data);
        }).catch(err => {
            setLoading(false);
            setError("Something went wrong!")
        })
        return () => {
            controller.abort();
        }
    }, [])

    const postFiltered = posts.filter(post => post.title.toLowerCase().includes(searchText))

    const handleRemovePost = (event) => {
        const newPosts = posts.filter((post) => post.id != event.target.id);
        setPosts(newPosts);
    }

    const handleSearchTitle = (event) => {
        setSearchText(event.target.value)
    }

    const getPostsSorted = () => {
        if (sortTitle === "None") {
            return postFiltered
        } else if (sortTitle === "ASC") {
            return postFiltered.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1)
        } else {
            return postFiltered.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
        }
    }

    const handleSortTitle = () => {
        if (sortTitle === "None") {
            setSortTitle("ASC");
        } else if (sortTitle === "ASC") {
            setSortTitle("DESC")
        } else {
            setSortTitle("None")
        }
    }

    const postsSorted = getPostsSorted();

    if (error) return <p className="error">{error}</p>
    return (
        <div className="posts-page">
            {loading &&
                <h1>It's loading</h1>
            }
            {!loading &&
                <div>
                    <div>
                        <input name="search" placeholder="Search by title" className="search-by-title" onChange={handleSearchTitle}/>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th onClick={handleSortTitle}>Title -- Sort {sortTitle}</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postsSorted.map(post => 
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>
                                            <Link to={"" + post.id}>View Detail</Link>
                                            <button id={post.id} className="btn-remove" onClick={handleRemovePost}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default PostsPage