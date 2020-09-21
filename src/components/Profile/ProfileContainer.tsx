import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router";

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
        debugger
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 11404
        }
        axios.get<ProfileType>(
            `https://social-network.samuraijs.com/api/1.0/profile/`+userId
        )
            .then(response => {
                this.props.setUserProfile(response.data)
            });
    }

    render () {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )

    }
}

let mapStateToProps=(state: AppStateType)=> ({
     profile: state.profilePage.profile
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps,{setUserProfile})(WithUrlDataContainerComponent)