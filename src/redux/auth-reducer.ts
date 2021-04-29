import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "network/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
};

export type AuthStateType ={
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captcha: string | null
}

const authReducer = (state = initialState, action: any): AuthStateType => {
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
type SetAuthUserDataActionPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number|null, email: string|null, login: string|null, isAuth: boolean): SetAuthUserDataActionType => (
    {type: SET_USER_DATA, payload:
            {id, email, login, isAuth}
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string}
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => (
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
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export default authReducer;