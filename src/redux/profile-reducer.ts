import {UserType} from "./users-reducer";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE"

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 4},
        {id: 2, message: "It's my first post", likesCount: 9}
    ],
    newPostText: "it-kamasutra.com",
    profile: null
};

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return  {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case  UPDATE_NEW_POST_TEXT: {
            return  {
                ...state,
            newPostText: action.newText
            };
        }
        case SET_USER_PROFILE: {
            // мы вернём копию state, в котором мы поменяем
            // profile на тот который пришёл в action
             return {...state, profile: action.profile}
        }
        default :
            return state

    }
};

export const addPostActionCreator =() => ({type: ADD_POST});
export const updateNewPostTextActionCreator =(text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile=(profile: any)=>({type: SET_USER_PROFILE, profile});

export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        });
}

export default profileReducer;