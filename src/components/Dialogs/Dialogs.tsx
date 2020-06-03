import React from "react";
import style from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {RootStateType} from "../../App";

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

type  PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

const Dialogs = (props: RootStateType) => {

    let dialogsElements = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);

    let messagesElements = props.state.messages.map(message => <Message message={message.message}/>);

    return <div className={style.dialogs}>
        <div className={style.dialogsItems}>

            {dialogsElements}

        </div>
        <div className={style.messages}>

            {messagesElements}

        </div>
    </div>
};

export default Dialogs;