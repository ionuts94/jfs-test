import React from 'react';
import './form-input.css';

const FormInput = ({type, name, placeholder, handleChange, inputClassName, containerClassName }) => {

    return(
        <div className={ inputClassName }>
            <div className={ `input-container ${containerClassName ? containerClassName : null}`}>
                <input
                    type={ type }
                    placeholder={ placeholder }
                    name={ name }
                    onChange = { handleChange }
                />
            </div>
        </div>
    )
}

export default FormInput;