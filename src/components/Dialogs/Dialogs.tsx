import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/state";


type  PropsType = {
    dialogsPage: DialogsPageType
}

const Dialogs = (props: PropsType) => {

    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);

    let messagesElements = props.dialogsPage.messages.map(message => <Message message={message.message}/>);

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