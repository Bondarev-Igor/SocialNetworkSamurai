const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 4},
        {id: 2, message: "It's my first post", likesCount: 9}
    ],
    newPostText: "it-kamasutra.com"
};

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_POST:
                let newPost = {
                    id: 5,
                    message: state.newPostText,
                    likesCount:0
                };
                state.posts.push(newPost);
                state.newPostText = " ";
            return state;
        case  UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default :
            return state
    }
};

export const addPostActionCreator =() => ({type: ADD_POST});
export const updateNewPostTextActionCreator =(text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export default profileReducer;