import React from "react";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import reduxForm, {InjectedFormProps} from "redux-form/lib/reduxForm";
import {ContactsType, PhotosType, ProfileType} from "../ProfileContainer";
import style from './ProfileInfo.module.css';

export type ProfileFormDataType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
type PropsType = {
    profile: ProfileType
}


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        {error && <div className={style.formSummaryError}>{error}</div>}
        <div>
            <b>Full name:</b>
            {createField("Full name", [], Input, "fullName", null)}
        </div>
        <div>
            <b>Looking for a job:</b>
            {createField("", [], Input, "lookingForAJob", {type: "checkbox"})}
        </div>
        <div>
            <b>My professional skills:</b>
            {createField("My professional skills", [], Textarea, "lookingForAJobDescription", null)}
        </div>
        <div>
            <b>About me:</b>
            {createField("About me:", [], Textarea, "aboutMe", null)}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map((key) => {
            return <div key={key} className='style.contact'>
                <b>{key}:{createField(key, [], Input, "contacts." + key, null)}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: "edit-profile"})(ProfileDataForm)

export default ProfileDataFormReduxForm;