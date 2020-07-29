import React from 'react';
import {RootStateType} from "../../../redux/store";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";


let mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewPostText: (text: string) => {
            let action = updateNewPostTextActionCreator(text)
            dispatch(action)
        },
        addPost: () => {
            dispatch(addPostActionCreator())
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;