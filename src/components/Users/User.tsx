import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/ava.jpg";
import {setCurrentPage, UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

type PropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>
}

const User = (props: PropsType) => {
    return (
        <div>
        <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                 className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {
                            user.followed ?
                                <button disabled={props.followingInProgress.some(id => id === user.id)}
                                        onClick={() => {
                                            props.unfollow(user.id)
                                        }}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              props.follow(user.id)
                                          }}>Follow</button>
                        }
               </div>
        </span>
            <span>
                             <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                            </span>
                            <span>
                            <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                            </span>

        </span>
        </div>

    )
};
export default User;
