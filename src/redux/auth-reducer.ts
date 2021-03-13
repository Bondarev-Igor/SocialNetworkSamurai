import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "network/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
};

export type AuthStateType ={
    id: null|number
    email: null|string
    login: null|boolean
    isAuth: boolean
    captcha: null|string
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_DATA :
        case GET_CAPTCHA_URL_SUCCESS:
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

export const getCaptchaUrlSuccess = (captchaUrl: string) => (
    {type: GET_CAPTCHA_URL_SUCCESS, payload : {captchaUrl}}
)

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: Dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData() as any)
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl() as any);
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}));
    }
};

export const getCaptchaUrl = () => async  (dispatch: Dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false) as any)
    }
};

export default authReducer;