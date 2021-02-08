import {createSelector} from "reselect";

export const getUsersSelector = (state: any) => {
    return state.usersPage.users;
}
export  const getUser = createSelector(getUsersSelector, (users: any) => {
    return users.filter ((u: any) => true)
})

export const getPageSize = (state: any) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: any) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: any) => {
    return state.usersPage.currentPage;
}
export const getIsFetchig = (state: any) => {
    return state.usersPage.isFetchig;
}
export const getFollowingInProgress = (state: any) => {
    return state.usersPage.followingInProgress;
}

