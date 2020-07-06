let rerenderEntireTree = (state: RootStateType) => {
};

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

export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type AddPostType ={
    addPost: () => void
}

export type updateNewPostTextType = {
    updateNewPostText: (newText: string) => void
}

export type RerenderEntireTreeType = {
    rerenderEntireTree: (state: RootStateType)=> void
}

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 4},
                {id: 2, message: "It's my first post", likesCount: 9}
            ],
            newPostText: "it-kamasutra.com"
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
    },
    rerenderEntireTree (state: RootStateType) {
    },

}

let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 4},
            {id: 2, message: "It's my first post", likesCount: 9}
        ],
        newPostText: "it-kamasutra.com"
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

 export let addPost =()=> {
     let newPost = {
         id: 5,
         message: state.profilePage.newPostText,
         likesCount:0
     };
     state.profilePage.posts.push(newPost);
     state.profilePage.newPostText = " ";
     rerenderEntireTree(state)
 };

 export let updateNewPostText =(newText: string)=> {
     state.profilePage.newPostText = newText;
     rerenderEntireTree(state)
 };

 export const subscribe = (observer: any) =>
     rerenderEntireTree=observer;

export default state;