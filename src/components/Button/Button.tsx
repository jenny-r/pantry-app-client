import './Button.css';

export enum ButtonColor {
    Blue = 'Button-blue',
    Gray = 'Button-gray'
}

interface ButtonProps {
    buttonText: string;
    buttonColor: ButtonColor;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({ buttonText, buttonColor, onClick }: ButtonProps) {

    return (
        <button className={'Button-button ' + buttonColor} onClick={onClick}>
            {buttonText}
        </button>
    )
}