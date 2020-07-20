import React from "react";
import style from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {DialogType} from "../../../redux/store";


// type dialogsDataType = {
//     id: number
//     name: string
// }

const DialogItem = (props: DialogType) => {

    let path = "/dialogs/" + props.id;

    return <div className={style.dialog + " " + style.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
};


export default DialogItem;