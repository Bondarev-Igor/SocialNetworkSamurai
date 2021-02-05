import React from "react";
import reduxForm, {InjectedFormProps} from "redux-form/lib/reduxForm";
import Field from "redux-form/lib/Field";
import {Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router";
import styles from "./../common/FormControls/FormControl.module.css"

type FormDataType ={
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"Email"}
                    validate={[required]}
                    component = {Input}
                    name = {"email"}/>
            </div>
            <div>
                <Field
                    placeholder={"Password"}
                    validate={[required]}
                    component = {Input}
                    name = {"password"}
                    type = {"password"}/>
            </div>
            <div>
                <Field type={"checkbox"} component = {Input} name = {"rememberMe"}/> Remember me
            </div>
            { props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType> ({ form: "login" })(LoginForm)

const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth){
        return <Redirect to={"/profile"}/>
    };

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth
});

export default connect ( mapStateToProps, {login, logout} )(Login);