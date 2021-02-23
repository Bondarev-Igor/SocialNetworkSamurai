import React from 'react';
import style from './ProfileInfo.module.css';
import {ProfileType} from "../ProfileContainer";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/ava.jpg"


type PropsType = {
    savePhoto: (file: any) => void
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: PropsType) => {
    // пока профиля нет - верни Preloader
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {

        }
    }
    return (
        <div className={style.content}>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={style.mainPhoto}/><br/>
                { props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/> }
                <ProfileStatusWithHooks status={props.status}
                                        updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;