import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setUserProfile} from "../../redux/profile-reducer";

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType={
    large: string
    small: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

class ProfileContainer extends React.Component<any>{

    componentDidMount(): void {
        axios.get<ProfileType>(
            `https://social-network.samuraijs.com/api/1.0/profile/2`
        )
            .then(response => {
                this.props.setUserProfile(response.data)
            });
    }

    render () {
        debugger
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
        
    }
}

let mapStateToProps=(state: AppStateType)=> ({
     profile: state.profilePage.profile
})

export default connect(mapStateToProps,{setUserProfile})(ProfileContainer)