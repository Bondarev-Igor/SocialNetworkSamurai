import React, {ChangeEvent} from 'react';
import style from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../redux/state";

export type PostsType = {
     posts: Array<PostType>
     addPost: (postMessage:string) => void
}

const MyPosts = (props: PostsType) => {

     let postsElements = props.posts.map(post=> <Post message={post.message} likesCount={post.likesCount}/>);

     let newPostElement = React.createRef<HTMLTextAreaElement>();

     let AddPost=()=> {
         if (newPostElement.current) {
             let text = newPostElement.current.value;
             props.addPost(text);
             newPostElement.current.value = "";
         }
     };
    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea ref = { newPostElement }></textarea>
                </div>
                <button onClick={ AddPost }>Add post</button>
                <button>Remove</button>
            </div>
            <div className={style.posts}>

                { postsElements }

            </div>
        </div>
    )
};

export default MyPosts;