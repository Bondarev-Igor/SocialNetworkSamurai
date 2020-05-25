import React from 'react';
import style from './MyPosts.module.css';
import Post from "./Post/Post";


const MyPosts = () => {
    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <button>Add post</button>
                <button>Remove</button>
            </div>
            <div className={style.posts}>
                <Post message='Hi, how are you?' like='1'/>
                <Post message="It's my first post" like='10'/>
            </div>
        </div>
    )
};

export default MyPosts;