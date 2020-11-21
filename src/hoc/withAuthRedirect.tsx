import React, {Component} from "react";
import {Redirect} from "react-router";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

let mapStateToPropsFromRedirect = (state: AppStateType ) => ({
    isAuth: state.auth.isAuth
});

export  const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any> {
        render() {
            if (!this.props.isAuth)  {
                return <Redirect to =  {'/login'} />
            }
            return <Component {...this.props}/>;
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsFromRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent
}