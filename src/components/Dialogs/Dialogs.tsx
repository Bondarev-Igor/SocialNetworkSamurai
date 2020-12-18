import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/dialogs-reducer";
import {Redirect} from "react-router";
import Field from "redux-form/lib/Field";
import reduxForm, {FormSubmitHandler, SubmitHandler} from "redux-form/lib/reduxForm";


type  PropsType = {
    dialogsPage: DialogsPageType
    sendMessage: (newMessageBody: string) => void
    isAuth: boolean
}

const Dialogs = (props: PropsType) => {

    let state = props.dialogsPage;

    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>);

    let messagesElements = props.dialogsPage.messages.map(message => <Message message={message.message} key={message.id}/>);

    if (!props.isAuth) return <Redirect to={'/login'}/>

    let addNewMessage = (values: any|undefined) => {
        props.sendMessage(values.newMessageBody);
    }

    return <div className={style.dialogs}>
        <div className={style.dialogsItems}>

            {dialogsElements}

        </div>
        <div className={style.messages}>

            <div>{messagesElements}</div>

        </div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
    </div>
};

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.addMessage}>
            <div>
                <Field component={"textarea"} name={"newMessageBody"} placeholder={"Enter yor message"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm ({form: "dialogAddMessageForm"}) (AddMessageForm)


export default Dialogs;