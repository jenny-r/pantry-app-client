import addIcon from '../../assets/plus-icon.png';
import './AddButton.css';

export function AddButton({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button className='AddButton-button' onClick={onClick}>
            <img className='AddButton-button-image' src={addIcon} alt='add' />
        </button>
    )
}