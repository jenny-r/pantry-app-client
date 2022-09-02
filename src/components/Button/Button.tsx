import { useState } from 'react';
import './Button.css';

export function Button({ buttonText, buttonColor }: { buttonText: string, buttonColor: string }) {

    return (
        <button className={'Button-button ' + buttonColor}>
            {buttonText}
        </button>
    )
}