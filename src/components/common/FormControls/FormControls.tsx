import React from "react";
import styles from "./FormControl.module.css";
import {required} from "../../../utils/validators/validator";
import Field from "redux-form/lib/Field";

export const Textarea = ({input, meta, ...props}: any) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input = ({input, meta, ...props}: any) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const createField = (placeholder: any, validators: any, component: any, name: any, props: any) => (
    <div>
        <Field
            placeholder={placeholder}
            validate={validators}
            component={component}
            name={name}
            {...props}/>
    </div>
)