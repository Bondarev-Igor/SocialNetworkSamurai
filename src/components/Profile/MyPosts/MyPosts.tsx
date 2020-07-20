import React, {ChangeEvent} from 'react';
import style from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {PostType} from "../../../redux/store";

export type PostsType = {
     posts: Array<PostType>
     addPost: () => void
     newPostText: string
     updateNewPostText: (text: string) => void
}



const MyPosts = (props: PostsType) => {

     let postsElements = props.posts.map(post=> <Post message={post.message} likesCount={post.likesCount}/>);

     let newPostElement = React.createRef<HTMLTextAreaElement>();

     let onAddPost=()=> {
         props.addPost();
     };

     let onPostChange = () => {
         let text = newPostElement.current!.value;
         props.updateNewPostText(text);
     };
    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea onChange={ onPostChange }
                              ref = { newPostElement }
                              value = {props.newPostText}/>
                </div>
                <button onClick={ onAddPost }>Add post</button>
                <button>Remove</button>
            </div>
            <div className={style.posts}>
                { postsElements }
            </div>
        </div>
    )
};

export default MyPosts;