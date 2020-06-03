import React from 'react';
import style from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {RootStateType} from "../../App";

type PostType={
    id: number
    message:string
    likesCount: number
}

export type PostsType = {
    posts: Array<PostType>
}


const Profile = (props: RootStateType) => {

    return (
        <div className={style.content}>
            <ProfileInfo/>
            <MyPosts posts={props.state.posts}/>
        </div>
    )
};

export default Profile;