import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPageType, sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/state";


type  PropsType = {
    dialogsPage: DialogsPageType
    dispatch: (action: any) => void
}

const Dialogs = (props: PropsType) => {

    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);

    let messagesElements = props.dialogsPage.messages.map(message => <Message message={message.message}/>);
    let newMessageBody = props.dialogsPage.newMessageBody;

    let onMessageClick = () => {
        debugger
        props.dispatch(sendMessageCreator());
    }

    let onNewMessageChange = (e: any) => {
        let body = e.target.value;
        props.dispatch(updateNewMessageBodyCreator(body));
    }

    return <div className={style.dialogs}>
        <div className={style.dialogsItems}>

            {dialogsElements}

        </div>
        <div className={style.messages}>

            <div>{messagesElements}</div>

        </div>
        <div className={style.addMessage}>
            <div>
                <textarea
                    value={ newMessageBody }
                    onChange={ onNewMessageChange }
                    placeholder="Enter yor message"></textarea>
            </div>
            <div>
                  <button onClick={ onMessageClick }>Send</button>
            </div>
        </div>
    </div>
};

export default Dialogs;