import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {DialogsPageType} from "../../redux/store";
import Dialogs from "./Dialogs";
import {Store} from "redux";
import StoreContext from "../../StoreContext";
import store from "../../redux/redux-store";


// type  PropsType = {store: Store}


const DialogsContainer = () => {

    return <StoreContext.Consumer>
        { store => {
            let state = store.getState().dialogsPage

            let onMessageClick = () => {
                store.dispatch(sendMessageCreator());
            }

            let onNewMessageChange = (body: string) => {
                store.dispatch(updateNewMessageBodyCreator(body));
            }

            return <Dialogs updateNewMessageBody={onNewMessageChange}
                            sendMessage={onMessageClick}
                            dialogsPage={state}/>
        }
    }
        </StoreContext.Consumer>

};

export default DialogsContainer;