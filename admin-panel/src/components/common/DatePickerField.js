import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

export const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    const { fieldName, id, name, type, required, min, max, disabled, ...rest } = props;
    return (

        <div className="form-group">
            <label htmlFor={id}>{fieldName}{required && (<span className="required-field-star">*</span>)}</label>
            <div className="date-picker-field">
                <DatePicker
                    dateFormat="MM/dd/yyyy"
                    showIcon
                    {...field}
                    {...props}
                    selected={(field.value && new Date(field.value)) || null}
                    onChange={val => {
                        setFieldValue(field.name, val);
                    }}
                    className="form-control "
                />
            </div>

            {props.errors[name] && props.touched[name] ? (
                <div className="validate">
                    <p>{props.errors[name]}</p>
                </div>
            ) : null}
        </div>
    );
};