import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatus, getUserProfile, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router";
import {compose} from "redux";

type ContactType = {
    [index: string] : string
}
// type ContactsType = {
//     github: any
//     vk: any
//     facebook: any
//     instagram: any
//     twitter: any
//     website: any
//     youtube: any
//     mainLink: any
// }
type ContactsType = {
    [index:string] : {message: string}
}


type PhotosType = {
    large: string
    small: string
}
export type ProfileType = {
    userId: number
    aboutMe: string
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

    refreshProfile () {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount(): void {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
        this.refreshProfile();
    }

    render() {
        return   <Profile {...this.props}
                          isOwner = {!this.props.match.params.userId}
                          profile = {this.props.profile}
                          status = {this.props.status}
                          updateStatus = {this.props.updateStatus}
                          savePhoto = {this.props.savePhoto}/>
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.id,
    isAuth: state.auth.isAuth,
});

export default compose<any>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer) as React.ComponentType


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
//
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)