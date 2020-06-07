import React from 'react';
import style from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";



export type PostsType = {
    profilePage: ProfilePageType
}


const Profile = (props: PostsType) => {

    return (
        <div className={style.content}>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}/>
        </div>
    )
};

export default Profile;