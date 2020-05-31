import React from 'react';
import style from './MyPosts.module.css';
import Post from "./Post/Post";

 type PropsType={
    id: number
    message:string
    likesCount: number
}


const MyPosts = () => {

    let posts = [
        {id: 1, message: 'Hi, how are you?', likesCount: 4},
        {id: 2, message: "It's my first post", likesCount: 9}
        ];

     let postsElements = posts.map(post=> <Post message={post.message} likesCount={post.likesCount}/>);

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
                { postsElements }
            </div>
        </div>
    )
};

export default MyPosts;