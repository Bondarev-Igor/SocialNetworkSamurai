import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";

type PostsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

const Profile = (props: PostsType) => {

    return (
        <div className={style.content}>
            <ProfileInfo profile={props.profile}
                         status = {props.status}
                         updateStatus = {props.updateStatus}/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;