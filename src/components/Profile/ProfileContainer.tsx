import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

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
type PhotosType = {
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


type PropsType = {
    profile: ProfileType,
    isAuth: boolean,
    getUserProfile: (userId: number) => void,
    withRouter: RouteComponentProps<any>
}

class ProfileContainer extends React.Component<any> {

    componentDidMount(): void {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 11697
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return   <Profile {...this.props} profile={this.props.profile}/>
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
});

export default compose<any>(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer) as React.ComponentType


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
//
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)