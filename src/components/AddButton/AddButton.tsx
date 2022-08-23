import addIcon from '../../assets/plus-icon.png';
import './AddButton.css';

export function AddButton() {
    return (
        <button className='AddButton-button'>
            <img className='AddButton-button-image' src={addIcon} alt='add' />
        </button>
    )
}