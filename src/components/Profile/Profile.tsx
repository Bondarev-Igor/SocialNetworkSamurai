import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";

type PostsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile:(formData: any) => Promise<any>
}

const Profile = (props: PostsType) => {

    return (
        <div className={style.content}>
            <ProfileInfo profile={props.profile}
                         status = {props.status}
                         updateStatus = {props.updateStatus}
                         isOwner = {props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;