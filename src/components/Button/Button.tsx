import { useState } from 'react';
import './Button.css';

export enum ButtonColor {
    Blue = 'Button-blue',
    Gray = 'Button-gray'
}

export function Button({ buttonText, buttonColor }: { buttonText: string, buttonColor: ButtonColor }) {

    return (
        <button className={'Button-button ' + buttonColor}>
            {buttonText}
        </button>
    )
}