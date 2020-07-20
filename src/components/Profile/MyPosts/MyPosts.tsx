import React, {ChangeEvent} from 'react';
import style from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {PostType} from "../../../redux/store";

export type PostsType = {
     posts: Array<PostType>
     dispatch: (action: any) => void
     newPostText: string
}



const MyPosts = (props: PostsType) => {

     let postsElements = props.posts.map(post=> <Post message={post.message} likesCount={post.likesCount}/>);

     let newPostElement = React.createRef<HTMLTextAreaElement>();

     let AddPost=()=> {
         // if (newPostElement.current) {
             // let text = newPostElement.current.value;
             props.dispatch( addPostActionCreator());
             // props.updateNewPostText(" ");
         // }
     };

     let onPostChange = () => {
         let text = newPostElement.current!.value;
         let action = updateNewPostTextActionCreator(text)
         props.dispatch(action);
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