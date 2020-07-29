import React from "react";
import { sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import { RootStateType} from "../../redux/store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = (state: RootStateType) => {
    return {
       dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
};

const  DialogsContainer = connect (mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;