import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth: boolean
    login: null|string
}

const Header = (props:any) => {
    return (
        <header className={style.header}>
            <img
                src="https://png.pngtree.com/template/20190313/ourlarge/pngtree-minimalist-bird-logo-image_66208.jpg "
                alt="Logo"/>
                <div className={style.loginBlock}>
                    {props.isAuth ? props.login : <NavLink to='/login'>Login</NavLink>}
                </div>
        </header>
    )
};

export default Header;