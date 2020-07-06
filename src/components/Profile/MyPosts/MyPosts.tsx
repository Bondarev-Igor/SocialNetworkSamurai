import React, {ChangeEvent} from 'react';
import style from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../redux/state";

export type PostsType = {
     posts: Array<PostType>
     dispatch: (action: any) => void
     newPostText: string
}

const MyPosts = (props: PostsType) => {

     let postsElements = props.posts.map(post=> <Post message={post.message} likesCount={post.likesCount}/>);

     let newPostElement = React.createRef<HTMLTextAreaElement>();

     let AddPost=()=> {
         debugger;
         // if (newPostElement.current) {
             // let text = newPostElement.current.value;
             props.dispatch( {type: "ADD-POST"});
             // props.updateNewPostText(" ");
         // }
     };

     let onPostChange = () => {
         let text = newPostElement.current!.value;
         props.dispatch({type: "UPDATE-NEW-POST-TEXT", newText: text});
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