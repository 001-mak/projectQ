import React from 'react';
import Select from 'react-select';


const customStyles = {
    indicatorsContainer: (provided, state) => ({
        ...provided,
        // minHeight: "44px",
        // height: "44px",
        // maxHeight: "500px",
    }),
    container: (provided, state) => ({
        ...provided,
        // minHeight: "44px",
        // height: "44px",
        // maxHeight: "500px",
    }),
    input: (provided, state) => ({
        ...provided,
        // minHeight: "44px",
        // height: "44px",
        // maxHeight: "500px",
    }),
    control: (provided) => ({
        ...provided,
        // minHeight: "44px",
        // height: "44px",
        // maxHeight: "500px",
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
}

function SelectField(FieldProps) {
    const { fieldName, id, name, isMulti, options } = FieldProps;
    
    return (
        <div className="form-group">
            <label htmlFor={id}>{fieldName}</label>
            <Select
                styles={customStyles}
                id={id} name={name}
                isMulti={isMulti}
                options={options}
                onChange={option => {
                    if (false) {
                        FieldProps.form.setFieldValue(FieldProps.field.name, option.map(x => x.value));
                    }
                    else {
                        FieldProps.form.setFieldValue(FieldProps.field.name, option.value);
                    }
                    if(FieldProps.onChangeExtra){
                        FieldProps?.onChangeExtra(option);
                    }
                }}
                // TODO for multiple isMulti? options.filter(x=>x.value == FieldProps.form.values[id]) :
                value={options.find(x=>x.value == FieldProps.form.values[id])}
            />
            {FieldProps.form.errors[id] && FieldProps.form.touched[id] ? (
                <div className="validate">
                    <p>{FieldProps.form.errors[id]}</p>
                </div>
            ) : null}
        </div>
    )
}


export default SelectField;