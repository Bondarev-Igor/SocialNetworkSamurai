import React from 'react';
import style from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/store";



export type PostsType = {
    profilePage: ProfilePageType
    dispatch: (action: any) => void
}


const Profile = (props: PostsType) => {

    return (
        <div className={style.content}>
            <ProfileInfo/>
            <MyPosts
                    posts={props.profilePage.posts}
                    dispatch={props.dispatch}
                    newPostText={props.profilePage.newPostText}
            />
        </div>
    )
};

export default Profile;