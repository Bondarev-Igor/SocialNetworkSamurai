import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {followAC, setUsersAC, unfollowAC, UserType} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";

// mapStateToProps принимает весь state целиком и возвращает
// объект только с теми данными, которые нам нужны
let mapStateToProps = (state: AppStateType) => {
   return {
      users: state.usersPage.users
   }
};

// mapDispatchToProps нужна для того, чтобы передавать
// презентационной компоненте callbacks

let mapDispatchToProps = (dispatch: any) => {
   return {
      // это функция, которая будет диспатчить вызываемые ActionCreater
      // followAC.
      // Мы диспатчим не АС,а результат работы АС!!!
          follow: (userId: number) => {
             dispatch (followAC(userId))
          },
          unfollow: (userId: number) => {
             dispatch (unfollowAC(userId))
          },
          setUsers: (users: Array<UserType>) => {
              dispatch(setUsersAC(users))
          }
   }
}


export default connect (mapStateToProps, mapDispatchToProps)(Users);