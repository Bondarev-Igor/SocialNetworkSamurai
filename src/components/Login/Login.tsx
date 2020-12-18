import React from "react";
import reduxForm from "redux-form/lib/reduxForm";
import Field from "redux-form/lib/Field";

const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} component = {"input"} name = {"Login"}/>
            </div>
            <div>
                <Field placeholder={"Password"} component = {"input"} name = {"Password"}/>
            </div>
            <div>
                <Field type={"checkbox"} component = {"input"} name = {"rememberMe"}/> Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm ({ form: 'login' })(LoginForm)

const Login = () => {
    const onSubmit = (formData: any) => {
        console.log(formData)
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login;