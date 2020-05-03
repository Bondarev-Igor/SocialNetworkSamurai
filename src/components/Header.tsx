import React from 'react';
import style from './Header.module.css';


const Header = () => {
    return (
        <header className={style.header}>
            <img
                src="https://png.pngtree.com/template/20190313/ourlarge/pngtree-minimalist-bird-logo-image_66208.jpg "
                alt="Logo"/>
        </header>
    )
};

export default Header;