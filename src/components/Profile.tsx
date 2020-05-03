import React from 'react';
import style from './Profile.module.css';


const Profile = () => {
    return (
        <div className={style.content}>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIB3QFozh1_t1Kc6YvfKM73Q0aUswu-l3jilKsl2k8UvLyV32u&usqp=CAU'
                alt="Image"/>
            <div>
                ava+description
            </div>
            <div>
                my posts
            </div>
            <div>
                new post
            </div>
            <div>
                <div>
                    post 1
                </div>
                <div>
                    post 2
                </div>
            </div>
        </div>
    )
};

export default Profile;