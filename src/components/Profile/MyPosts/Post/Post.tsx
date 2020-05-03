import React from 'react';
import style from './Post.module.css';


const Post = () => {
    return (
        <div className={style.item}>
            <img src='https://lh3.googleusercontent.com/proxy/EUeBtoKcLyHh-dK8Hv2By_5zzTpKmV_Z6pjUAFBbamjrYs4qB-WtO2-eico8BbnpuWuJJ2ymRkJWo0vsFzx9ip7diH43FmRv4OIC8d8XfSKfkEhuu12yN8cn8L_72tC1pAxsC5xyjjv1UOli'/>
           Post
            <div>
            <span>like</span>
            </div>
        </div>
    )
};

export default Post;