import React from 'react';
import style from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";



export type PostsType = {
    profilePage: ProfilePageType
    addPost: () => void
    updateNewPostText: (newText:string) => void
}


const Profile = (props: PostsType) => {

    return (
        <div className={style.content}>
            <ProfileInfo/>
            <MyPosts
                    posts={props.profilePage.posts}
                    addPost={props.addPost}
                    newPostText={props.profilePage.newPostText}
                    updateNewPostText={props.updateNewPostText}
            />
        </div>
    )
};

export default Profile;