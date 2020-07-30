const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

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
    newMessageBody: ""
}

const dialogsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return  {
                ...state,
                newMessageBody:action.body
            };
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return  {
                ...state,
                newMessageBody:'',
            messages:[...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
};

export const sendMessageCreator =() => ({type: SEND_MESSAGE});
export const updateNewMessageBodyCreator =(body: string) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body});

export default dialogsReducer;