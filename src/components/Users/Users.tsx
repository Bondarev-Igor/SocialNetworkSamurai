import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/ava.jpg";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type PropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Users = (props: PropsType) => {

    // определяем количество страниц для отрисовки
    // разделив количество всех пользователей на
    // размер страницы для отрисовки
    // затем полученный результат от деления округляем в большую сторону
    let pagesCount: number = Math.ceil(props.totalUsersCount / props.pageSize);

    // создаём массив страниц, котороый потом отрисуем
    let pages = [];
    // заполним массив pages
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage : " "}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                 className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {
                            u.followed ?
                                <button onClick={() => {
                                    axios.delete<any>(
                                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                        {withCredentials: true,
                                            headers: {
                                            "API-KEY": "7add98d9-734d-4189-972a-5d1bc689d34f"
                                            }
                                        }
                                    )
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                        });
                                }}>Unfollow</button>
                                    : <button onClick={() => {
                                        axios.post<any>(
                                            `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                            {}, {withCredentials: true,
                                                headers: {
                                                    "API-KEY": "7add98d9-734d-4189-972a-5d1bc689d34f"
                                                }
                                            }
                                        )
                                            .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    props.follow(u.id)
                                                }
                                            });
                                    }}>Follow</button>
                                }
                            </div>
                            </span>
                            <span>
                            <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                            </span>
                            <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                            </span>

                            </span>
                            </div>)
                            }
                            </div>
                            }

                            export default Users;
