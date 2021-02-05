import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
};

export type AuthStateType ={
    id: null|number
    email: null|string
    login: null|boolean
    isAuth: boolean
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_DATA :
            return {
                // с сервера мы получаем данные, и мы их устанавливаем,
                // перезатирая в старом стейте всё, что было
                ... state,
                // в action мы создадим объект data и его
                // деструктуризируем, в нём будут лежать
                // userId, email, login, таки м образом
                // мы объединяем два объекта в один
                ...action.payload,
        }
        default :
            return state
    }
};

export const setAuthUserData = (id: number|null, email: null | string, login: null | boolean, isAuth: boolean) => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}}
);

export const getAuthUserData = () => (dispatch: Dispatch) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        });
};

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData() as any)
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit("login", {_error: message}));
            }
        });
};

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false ) as any)
            }
        });
};

export default authReducer;