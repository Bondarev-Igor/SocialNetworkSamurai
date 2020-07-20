import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {DialogsPageType} from "../../redux/store";
import Dialogs from "./Dialogs";


type  PropsType = {
    store: any
}

const DialogsContainer = (props: PropsType) => {

    let state = props.store.getState().dialogsPage

    let onMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    }

    let onNewMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageBodyCreator(body));
    }

    return <Dialogs updateNewMessageBody={onNewMessageChange}
                    sendMessage={onMessageClick}
                    dialogsPage={state}/>
};

export default DialogsContainer;