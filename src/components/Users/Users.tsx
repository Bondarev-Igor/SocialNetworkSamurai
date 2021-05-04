import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>
}

const Users = (props: PropsType) => {

    return <div>
        <Paginator totalItemsCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   portionSize={20}/>
        <div>
            {
                props.users.map(u => <User user={u}
                                           followingInProgress={props.followingInProgress}
                                           key={u.id}
                                           unfollow={props.unfollow}
                                           follow={props.follow}
                    />
                )

            }
        </div>
    </div>
}

export default Users;
