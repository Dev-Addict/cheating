import {Fragment} from 'react';

const Input = ({type, label, field, form: {touched, errors}, ...props}) => {
    return (
        <Fragment>
            <label>{label}</label>
            <input type={type} {...field} placeholder={label}/>
            {
                touched[field.name] && errors[field.name] &&
                <div className="error">{errors[field.name]}</div>
            }
        </Fragment>
    );
};

export default Input;