import React from "react";
import style from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";

type PropsType = {
    name: string
    id: number
}

const Dialogs = (props: PropsType) => {

    let dialogs = [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Elena'},
        {id: 3, name: 'Pavel'},
        {id: 4, name: 'Victor'},
        {id: 5, name: 'Valera'}
    ];

    let messages = [
        {id: 1, message: 'Ku'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Waz'},
        {id: 5, message: 'Zzz'}
    ];

    let dialogsElements = dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);

    let messagesElements = messages.map(message => <Message message={message.message}/>);

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