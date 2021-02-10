import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 4},
        {id: 2, message: "It's my first post", likesCount: 9}
    ],
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return  {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            // мы вернём копию state, в котором мы поменяем
            // profile на тот который пришёл в action
             return {...state, profile: action.profile}
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        default :
            return state

    }
};

export const addPostActionCreator =(newPostText: string) => ({type: ADD_POST, newPostText});
export const setUserProfile=(profile: any) => ( {type: SET_USER_PROFILE, profile} );
export const setStatus = (status: string) => ( {type: SET_STATUS, status} );
export const deletePost = (postId: number) => ( {type: DELETE_POST, postId} );

export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        });
};

export const getStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        })
};

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
};

export default profileReducer;