import {AnyAction, Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {AppStateType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
const ADD_POST = "network/profile-reducer/ADD-POST";
const SET_USER_PROFILE = "network/profile-reducer/SET_USER_PROFILE";
const SET_STATUS = "network/profile-reducer/SET_STATUS";
const DELETE_POST = "network/profile-reducer/DELETE_POST";
const SAVE_PHOTO_SUCCESS = "network/profile-reducer/SAVE_PHOTO_SUCCESS";



let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 4},
        {id: 2, message: "It's my first post", likesCount: 9}
    ] as Array<PostType>,
    profile: null as ProfileType|null,
    status: '',
    newPostText: '',
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: {...state.profile as ProfileType, photos: action.photos}
            }
        }
        default :
            return state
    }
};

type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText});
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ( {type: SET_USER_PROFILE, profile} );
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ( {type: SET_STATUS, status} );
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ( {type: DELETE_POST, postId} );
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ( {type: SAVE_PHOTO_SUCCESS, photos} );

export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data))
};

export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
};

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
};

export const savePhoto = (file: any) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: Dispatch<AnyAction>, getState:any) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId) as any)
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }
};

export default profileReducer;