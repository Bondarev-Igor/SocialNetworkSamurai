import {DialogType, MessageType} from "./store";

const SEND_MESSAGE = "network/dialogs-reducer/SEND_MESSAGE";

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Elena'},
        {id: 3, name: 'Pavel'},
        {id: 4, name: 'Victor'},
        {id: 5, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Ku'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Waz'},
        {id: 5, message: 'Zzz'}
    ],
}

export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}

const dialogsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return  {
                ...state,
            messages:[...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
};

export const sendMessageCreator =(newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;