import React from "react";
import style from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    id: number
}

type MessageType = {
    message: string
}

type MessageDataType = {
    id: number
    message: string
}

type dialogsDataType = {
    id: number
    name: string
}

const DialogItem = (props: dialogsDataType) => {

    let path = "/dialogs/" + props.id

    return <div className={style.dialog + " " + style.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
};


export default DialogItem;