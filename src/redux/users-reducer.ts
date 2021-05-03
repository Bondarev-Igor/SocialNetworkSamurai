import {usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";

const FOLLOW = "network/users-reducer/FOLLOW";
const UNFOLLOW = "network/users-reducer/UNFOLLOW";
const SET_USERS = "network/users-reducer/SET_USERS";
const SET_CURRENT_PAGE = "network/users-reducer/SET_CURRENT-PAG";
const SET_USERS_TOTAL_COUNT = "network/users-reducer/SET_USERS_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "network/users-reducer/TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "network/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS"


export type setCurrentPageActionType = {
    type: "SET_CURRENT_PAGE"
    currentPage: number
}
type ActionType = setCurrentPageActionType

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 11,
    totalUsersCount: 0,
    currentPage: 1,
    isFetchig: true,
    followingInProgress: [] as Array<number> //Array of User ids
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                // // первым делом, мы создаем копию всего state
                // ...state,
                // // далее создаем копию массива, внутри которой мы будем что-то менять
                // // для этого очень хорошо подходит метод массива map, т.к. он на основе
                // //  старого массива возвращает новый массив и позволяет сделать в нем изменения
                // users: state.users.map(u => {
                //     // если u.id в пробегаемом массиве равна той userId, которая пришла в action
                //     // мы далжны сделать в нем изменения: followed поменять на противоположный
                //     if (u.id === action.userId) {
                //         // но мы не можем изменить пользователя, который к нам пришел, т.к.
                //         // массив, который к нам пришел должен остаться неизменным,
                //         // то мы создаем копию этого пользователя и вернуть уже его копию
                //         return {...u, followed: true}
                //     }
                //     // если id совпадают мы возвращаем копию, если нет то тот же самый объект
                //     return u;
                // })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
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
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default :
            return state
    }
};

// В АС нужен userId, чтобы понимать за каким юзером нам следить.
// В АС он попадет как параметр.
type FollowSuccesActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccesActionType => ({type: FOLLOW, userId});
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});
// массив пользователей изначально бдует пустой, т.е. нам нужен АС, кот.
// будет сетать user. users придут к нам с сервера, мы возьмем их
// и засетаем в стейт
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});
type SetUsersTotalCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    totalCount: number
}
export const setUsersTotalCount = (totalCount: number): SetUsersTotalCountActionType => ({type: SET_USERS_TOTAL_COUNT, totalCount});
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUsersTotalCount(data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if(response.data.resultCode == 0){
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), followSuccess);
    }
}
export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), unfollowSuccess);
    }
}

// export const follow = (userId: number) => {
//     return async (dispatch: Dispatch) => {
//         dispatch(toggleFollowingProgress(true, userId));
//         let response = await usersAPI.follow(userId)
//         if (response.data.resultCode === 0) {
//             dispatch(followSuccess(userId))
//         }
//         dispatch(toggleFollowingProgress(false, userId))
//     }
// }
//
// export const unfollow = (userId: number) => {
//     return async (dispatch: Dispatch) => {
//         dispatch(toggleFollowingProgress(true, userId))
//         let response = await usersAPI.unfollow(userId)
//         if (response.data.resultCode === 0) {
//             dispatch(unfollowSuccess(userId))
//         }
//         dispatch(toggleFollowingProgress(false, userId))
//     }
// }

export default usersReducer;