import React from 'react';
import style from './ProfileInfo.module.css';



const ProfileInfo = () => {
    return (
        <div className={style.content}>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIB3QFozh1_t1Kc6YvfKM73Q0aUswu-l3jilKsl2k8UvLyV32u&usqp=CAU'
                alt="avatar"/>
            <div className={style.descriptionBlock}>
                ava+description
            </div>
        </div>
    )
};

export default ProfileInfo;