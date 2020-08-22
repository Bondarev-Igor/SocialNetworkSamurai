import React, {SyntheticEvent} from "react";
import styles from "./users.module.css"
import {setCurrentPageActionType, UserType} from "../../redux/users-reducer";
import axios from 'axios';
import userPhoto from '../../assets/images/ava.jpg'

type PropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setUsersTotalCount: (totalCount: number)=> void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
}

class Users extends React.Component <PropsType> {


    componentDidMount(): void {
        axios.get<any>(
            `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
        )
            .then(response => {
            this.props.setUsers(response.data.items)
            this.props.setUsersTotalCount(response.data.totalCount)
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get<any>(
            `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
        )
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        // определяем количество страниц для отрисовки
        // разделив количество всех пользователей на
        // размер страницы для отрисовки
        // затем полученный результат от деления округляем в большую сторону
        let pagesCount: number = Math.ceil(this.props.totalUsersCount/this.props.pageSize);

        // создаём массив страниц, котороый потом отрисуем
        let pages = [];
        // заполним массив pages
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return <div>
            <div>
                {pages.map(p=>{
                    return <span className={this.props.currentPage === p ? styles.selectedPage : " "}
                           onClick={(e) => {this.onPageChanged(p)}}>{p}</span>
                })}
            </div>
            {

                this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {
                            u.followed ?
                                <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
}


export default Users;