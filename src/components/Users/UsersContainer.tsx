import React from "react";
import {connect} from "react-redux";
import {
    follow,requestUsers,
    setCurrentPage, setUsers, setUsersTotalCount,
    toggleFollowingProgress, unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetchig,
    getPageSize,
    getTotalUsersCount, getUsers,
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetchig: boolean
    followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setUsersTotalCount: (totalCount: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component <PropsType> {

    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize);
        // this.props.toggleIsFetching(true)
        //
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //         this.props.toggleIsFetching(false)
        //         this.props.setUsers(data.items)
        //         this.props.setUsersTotalCount(data.totalCount)
        //     });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize)
    }


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <>
            {this.props.isFetchig ? <Preloader/>  : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingInProgress = {this.props.followingInProgress}
            />
        </>
    }
}


// mapStateToProps принимает весь state целиком и возвращает
// объект только с теми данными, которые нам нужны
let mapStateToProps = (state: AppStateType) => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetchig: getIsFetchig(state),
    followingInProgress: getFollowingInProgress(state),
});

// mapDispatchToProps нужна для того, чтобы передавать
// презентационной компоненте callbacks

export default compose <any>(connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>
(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage,
    setUsersTotalCount, toggleFollowingProgress, getUsers: requestUsers})) (UsersContainer) as React.ComponentType