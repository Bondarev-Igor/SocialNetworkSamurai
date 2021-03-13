import React from "react";
import reduxForm, {InjectedFormProps} from "redux-form/lib/reduxForm";
import Field from "redux-form/lib/Field";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router";
import styles from "./../common/FormControls/FormControl.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type CaptchaType = {
    captchaUrl: string
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, CaptchaType> & CaptchaType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
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
            {captchaUrl && <img src = {captchaUrl}/>}
            {captchaUrl &&  createField("Symbols from image", [required], Input, "captcha", {})}
            { error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, CaptchaType> ({ form: "login" })(LoginForm)

const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth){
        return <Redirect to={"/profile"}/>
    };

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl = {props.captchaUrl}/>
    </div>
};

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect ( mapStateToProps, {login, logout} )(Login);