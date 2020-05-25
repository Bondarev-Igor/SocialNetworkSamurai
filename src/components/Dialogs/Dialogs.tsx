import React from "react";
import style from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


const Dialogs = (props: any) => {
    return <div className={style.dialogs}>
        <div className={style.dialogsItems}>
            <div className={style.dialog + " " + style.active}>
                <NavLink to="/dialogs/1">Dimych</NavLink>
            </div>
            <div className={style.dialog}>
                <NavLink to="/dialogs/2">Elena</NavLink>
            </div>
            <div className={style.dialog}>
                <NavLink to="/dialogs/3">Ekaterina</NavLink>
            </div>
            <div className={style.dialog}>
                <NavLink to="/dialogs/4">Victor</NavLink>
            </div>
            <div className={style.dialog}>
                <NavLink to="/dialogs/5">Valera</NavLink>
            </div>
        </div>
        <div className={style.messages}>
            <div className={style.message}>Hi</div>
            <div className={style.message}>Ku</div>
            <div className={style.message}>Yo</div>
        </div>
    </div>
};

export default Dialogs;