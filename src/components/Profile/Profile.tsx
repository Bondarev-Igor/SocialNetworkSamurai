import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

export type PostsType = {
    store: any
}

const Profile = (props: PostsType) => {

    return (
        <div className={style.content}>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    )
};

export default Profile;