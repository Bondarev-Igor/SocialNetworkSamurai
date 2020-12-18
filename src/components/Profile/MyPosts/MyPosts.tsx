import React, {ChangeEvent} from 'react';
import style from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../redux/store";
import Field from "redux-form/lib/Field";
import reduxForm from "redux-form/lib/reduxForm";

export type PostsType = {
     posts: Array<PostType>
     addPost: (newPostText: string) => void
}

const MyPosts = (props: PostsType) => {

     let postsElements = props.posts.map(post=> <Post message={post.message} likesCount={post.likesCount} key={post.id}/>);

     let newPostElement = React.createRef<HTMLTextAreaElement>();

     let addPost = (values: any|undefined) => {
         props.addPost(values.newPostText);
     }

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <PostFormRedux onSubmit = {addPost}/>
            <div className={style.posts}>
                { postsElements }
            </div>
        </div>
    )
};

const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newPostText"}/>
            </div>
            <button>Add post</button>
        </form>
    )
}

const PostFormRedux = reduxForm ({form: "profileAddPostForm"}) (AddNewPostForm)

export default MyPosts;