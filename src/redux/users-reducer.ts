import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT-PAG';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: number,
    photos: PhotosType,
    name: string,
    followed: boolean,
    status: string,
    location: LocationType
}

export type LocationType = {
    city: string,
    country: string
}

export type setCurrentPageActionType = {
    type: "SET_CURRENT_PAGE"
    currentPage: number
}

type ActionType = setCurrentPageActionType


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    isFetchig: true,
    followingInProgress: [] as Array<number>
};

const usersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FOLLOW :
            return {
                // первым делом, мы создаем копию всего state
                ...state,
                // далее создаем копию массива, внутри которой мы будем что-то менять
                // для этого очень хорошо подходит метод массива map, т.к. он на основе
                //  старого массива возвращает новый массив и позволяет сделать в нем изменения
                users: state.users.map(u => {
                    // если u.id в пробегаемом массиве равна той userId, которая пришла в action
                    // мы далжны сделать в нем изменения: followed поменять на противоположный
                    if (u.id === action.userId) {
                        // но мы не можем изменить пользователя, который к нам пришел, т.к.
                        // массив, который к нам пришел должен остаться неизменным,
                        // то мы создаем копию этого пользователя и вернуть уже его копию
                        return {...u, followed: true}
                    }
                    // если id совпадают мы возвращаем копию, если нет то тот же самый объект
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        case SET_USERS: {
            //придут пользователи(users), я возьму старый стейт,
            //пользователей, которые там были и перезатру их
            //теми пользователями, которые пришли
            return {
                ...state,
                users: action.users
            };
        }
        case SET_CURRENT_PAGE: {
            // создаем объект и меняем в нем currentPage на то, что
            // придет в action
            return {...state, currentPage: action.currentPage}
        }
        case SET_USERS_TOTAL_COUNT : {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetchig: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default :
            return state
    }
};

// В АС нужен userId, чтобы понимать за каким юзером нам следить.
// В АС он попадет как параметр.

export const followSuccess = (userId: number) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId});
// массив пользователей изначально бдует пустой, т.е. нам нужен АС, кот.
// будет сетать user. users придут к нам с сервера, мы возьмем их
// и засетаем в стейт
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCount = (totalCount: number) => ({type: SET_USERS_TOTAL_COUNT, totalCount});
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setUsersTotalCount(data.totalCount))
        });
    }
}

export const follow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            });
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            });
    }
}


export default usersReducer;