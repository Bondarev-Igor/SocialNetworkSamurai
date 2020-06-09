import {rerenderEntireTree} from "../render";

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
}

export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type AddPostType ={
    addPost: (postMessage: string) => void
}

export type RerenderEntireTreeType = {
    rerenderEntireTree: (state:RootStateType)=> void
}

let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 4},
            {id: 2, message: "It's my first post", likesCount: 9}
        ]
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
        ]
    }
};

 export let addPost =(postMessage: string)=> {
     let newPost = {
         id: 5,
         message: postMessage,
         likesCount:0
     };
     state.profilePage.posts.push(newPost);
     rerenderEntireTree(state)
 }

export default state;