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
            <div>
                <Post message='Hi, how are you?' like='1'/>
                <Post message="It's my first post" like='10'/>
            </div>
        </div>
    )
};

export default MyPosts;