import React from 'react';
import style from './MyPosts.module.css';
import Post from "./Post/Post";


const MyPosts = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
                <button>Add post</button>
                <button>Remove</button>
            </div>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
};

export default MyPosts;