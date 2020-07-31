import React from "react";
import styles from "./users.module.css"
import {UserType} from "../../redux/users-reducer";

type PropsType ={
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}

let Users = (props: PropsType) => {
    if (props.users.length === 0) {
        props.setUsers( [
            {id: 1,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8wU0QKZqVzoqdsR8QbksdwdkY0Q3AFDEbpg&usqp=CAU',
                fullName: 'Igor', followed: true, status: 'I am busy', location: {city: 'Minsk', country: 'Belarus' }},
            {id: 2,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8wU0QKZqVzoqdsR8QbksdwdkY0Q3AFDEbpg&usqp=CAU',
                fullName: 'Egor', followed: false, status: 'I am clever', location: {city: 'Moscow', country: 'Russia' }},
            {id: 3,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8wU0QKZqVzoqdsR8QbksdwdkY0Q3AFDEbpg&usqp=CAU',
                fullName: 'Elena', followed: false, status: 'I am beautiful', location: {city: 'Kiev', country: 'Ukraine' }},
            {id: 4,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8wU0QKZqVzoqdsR8QbksdwdkY0Q3AFDEbpg&usqp=CAU',
                fullName: 'Victor', followed: true, status: 'I am wise', location: {city: 'Minsk', country: 'Belarus' }}
       ] )
    }

    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {
                            u.followed ?
                                <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                       <div>{u.fullName}</div>
                       <div>{u.status}</div>
                    </span>
                    <span>
                       <div>{u.location.country}</div>
                       <div>{u.location.city}</div>
                    </span>

                </span>
            </div>)
        }
    </div>
}

export default Users;