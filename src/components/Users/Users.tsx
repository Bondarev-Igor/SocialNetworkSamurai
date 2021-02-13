import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/ava.jpg";
import {setCurrentPage, UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
    user: UserType
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
        <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                   currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
        {
            props.users.map(u => <User user = {u}
                                       followingInProgress={props.followingInProgress}
                                       key = {u.id}
                                       unfollow={props.unfollow}
                                       follow={props.follow}/> )



            //     <div key={u.id}>
            //     <span>
            //         <div>
            //             <NavLink to={'/profile/' + u.id}>
            //                 <img src={u.photos.small != null ? u.photos.small : userPhoto}
            //                      className={styles.userPhoto}/>
            //             </NavLink>
            //         </div>
            //         <div>
            //             {
            //                 u.followed ?
            //                     <button disabled={props.followingInProgress.some(id => id === u.id)}
            //                             onClick={() => {
            //                                 props.unfollow(u.id)
            //                             }}>Unfollow</button>
            //                     : <button disabled={props.followingInProgress.some(id => id === u.id)}
            //                               onClick={() => {
            //                                   props.follow(u.id)
            //                               }}>Follow</button>
            //             }
            //        </div>
            //                 </span>
            //     <span>
            //                 <span>
            //                 <div>{u.name}</div>
            //                 <div>{u.status}</div>
            //                 </span>
            //                 <span>
            //                 <div>{"u.location.country"}</div>
            //                 <div>{"u.location.city"}</div>
            //                 </span>
            //
            //                 </span>
            // </div>)
        }
    </div>
}

export default Users;
