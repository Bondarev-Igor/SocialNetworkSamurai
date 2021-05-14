import preloader from "../../../assets/images/preloader.gif";
import React from "react";
import style from './Preloader.module.css'

type PropsType = {
    
}

let Preloader = (props: PropsType) => {
        return <div style={{backgroundColor: 'white'}} className={style.preloader}>
            <img src={preloader} />
        </div>
};

export default Preloader;