import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
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
                ...action.data,
                isAuth: true,
        }
        default :
            return state
    }
};

export const setAuthUserData = (id: number, email: null|string, login: null|boolean) => ({type: SET_USER_DATA, data: {id, email, login}});

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login))
            }
        });
}

export default authReducer;