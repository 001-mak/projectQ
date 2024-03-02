import React from "react";
import { Field } from 'formik';

function TextField(props) {
    const { fieldName, id, name, type, required, min, max, disabled, ...rest } = props;


    return (
        <div className="form-group">
            <label htmlFor={id}>{fieldName}{required && (<span className="required-field-star">*</span>)}</label>
            <Field type={type} className="form-control" id={id} name={name} min={min} max={max} disabled={disabled} />
            {props.errors[name] && props.touched[name] ? (
                <div className="validate">
                    <p>{props.errors[name]}</p>
                </div>
            ) : null}
        </div>
    )
}

export default TextField;