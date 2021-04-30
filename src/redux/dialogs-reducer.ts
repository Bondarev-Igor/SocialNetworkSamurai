const SEND_MESSAGE = "network/dialogs-reducer/SEND_MESSAGE";

type DialogType ={
    id:number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Elena'},
        {id: 3, name: 'Pavel'},
        {id: 4, name: 'Victor'},
        {id: 5, name: 'Valera'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Ku'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Waz'},
        {id: 5, message: 'Zzz'}
    ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}

const dialogsReducer = (state = initialState, action: any):InitialStateType => {
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

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageCreator =(newMessageBody: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;