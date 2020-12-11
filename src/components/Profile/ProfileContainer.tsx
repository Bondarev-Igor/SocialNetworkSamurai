import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
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
    withRouter: RouteComponentProps<any>,
    getStatus: (userId: number) => void,
    updateStatus: (status: string) => void,
    status: string,
}

class ProfileContainer extends React.Component<any> {

    componentDidMount(): void {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 8951
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return   <Profile {...this.props}
                          profile = {this.props.profile}
                          status = {this.props.status}
                          updateStatus = {this.props.updateStatus}/>
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
});

export default compose<any>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer) as React.ComponentType


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
//
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)