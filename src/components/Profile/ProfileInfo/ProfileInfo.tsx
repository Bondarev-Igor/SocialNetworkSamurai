import React, {useState} from 'react';
import style from './ProfileInfo.module.css';
import {ProfileType} from "../ProfileContainer";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/ava.jpg"
import ProfileDataForm, {ProfileFormDataType} from "./ProfileDataForm";



type PropsType = {
    savePhoto: (file: any) => void
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    saveProfile:(formData: any) => void
}

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode:() => void
}


const ProfileInfo = (props: PropsType) => {

    let [editMode, setEditMode] = useState(false)

    // пока профиля нет - верни Preloader
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) { // если длинна у выбранного объекта есть
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileFormDataType) => {
        props.saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div className={style.content}>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={style.mainPhoto}/><br/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                { editMode
                    ? <ProfileDataForm onSubmit={onSubmit} initialValues={props.profile} profile={props.profile}/>
                    : <ProfileData goToEditMode = {() => setEditMode(true)} profile={props.profile} isOwner={props.isOwner} /> }
                <ProfileStatusWithHooks status={props.status}
                                        updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}
const ProfileData = (props: ProfileDataType) => {
    return <div>
        {props.isOwner && <div><button onClick={props.goToEditMode}>Edit</button></div>}
        <div>
            <b>Full name:</b> {props.profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {props.profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {props.profile.lookingForAJob &&
        <div>
            <b>My professional skills:</b> {props.profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>About me:</b> {props.profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(props.profile.contacts).map((key) => {
            return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
        })}
        </div>
    </div>
}

const Contacts = ({contactTitle, contactValue}: any) => {
    return <div className={style.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;