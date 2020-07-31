
export type MessageType = {
    id: number
    message: string
}

export type DialogType = {
    id: number
    name: string
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePageType ={
    posts: Array<PostType>
    newPostText: string
}



/*export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    usersPage: Array<UserType>
}*/



export type AddPostType ={
    addPost: () => void
}

export type UpdateNewPostTextType = {
    updateNewPostText: (newText: string) => void
}

/*export type CallSubscribeType = {
    _callSubscriber: (state: RootStateType)=> void
}*/

export type DispatchType = {
    dispatch :(action: any) => void
}

/*export type StoreType = {
    _state: RootStateType,
    getState: () => RootStateType,
    _callSubscriber: CallSubscribeType,
    addPost: AddPostType,
    updateNewPostText: UpdateNewPostTextType,
    subscribe:(observer: any) => void
    dispatch: (action: any) => void
}*/

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 4},
                {id: 2, message: "It's my first post", likesCount: 9}
            ],
            newPostText: "it-kamasutra.com",
        },
        dialogsPage:{
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
        },
        sidebar: { }
    },
    // // _callSubscriber (state: RootStateType) {
    // //     console.log("State changed");
    // },
    // getState () {
    //     return this._state;
    // },
    // subscribe (observer: any) {
    //     this._callSubscriber = observer;
    // },

    // dispatch (action: any) {
    //
    //     this._state.profilePage = profileReducer(this._state.profilePage,action);
    //     this._state.dialogsPage = dialogsReducer(this._state.dialogsPage,action);
    //     this._state.sidebar = sidebarReducer(this._state.sidebar, action)
    //     this._callSubscriber(this._state);
    // }
};

export default store;
//@ts-ignore
window.store = store;