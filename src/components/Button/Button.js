import React from 'react';
import {buttonProps} from "./ButtonProps";
import './Button.scss'

function Button({
                    text = 'Button',
                    onClck = () => {

                    },
                    size = buttonProps.size.small,
                    color = buttonProps.color.dark,
                    bgColor = buttonProps.background_color.grey,
                    type = 'button'
                }) {

    const customStyles = {
        // backgroundColor: bgColor,
        // color: color,
    }
    return (
        <button className={`button ${size} ${color} ${bgColor}`} onClick={() => onClck()}
             style={customStyles}
        type={type}
        >
            {text}
        </button>
    );
}

export default Button;