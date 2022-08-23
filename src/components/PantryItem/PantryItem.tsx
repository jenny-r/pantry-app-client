import groceryIcon from '../../assets/shopping-cart-icon.png';
import decreaseIcon from '../../assets/minus-icon.png';
import increaseIcon from '../../assets/plus-icon.png';
import { PantryItemType } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { increase, decrease } from '../../store/pantrySlice';
import './PantryItem.css';

interface PantryItemProps {
    item: PantryItemType;
}

export function PantryItem({ item }: PantryItemProps) {

    const dispatch = useAppDispatch();

    return (
        <div className='PantryItem-pantry-list-item'>
            <div className='PantryItem-item-container'>
                <div className='PantryItem-name-container-left'>
                    <h3 className='PantryItem-name'>{item.name}</h3>
                    <p className='PantryItem-unit'>{item.unit}</p>
                </div>
                <div className='PantryItem-button-container-right'>
                    <div className='PantryItem-count-container'>
                        <button
                            className='PantryItem-count-button decrease'
                            onClick={() => dispatch(decrease(item.id))}
                        >
                            <img
                                className='PantryItem-count-button-image'
                                src={decreaseIcon}
                                alt='decrease'
                            />
                        </button>
                        <div className='PantryItem-quantity'>{item.quantity}</div>
                        <button
                            className='PantryItem-count-button increase'
                            onClick={() => dispatch(increase(item.id))}
                        >
                            <img
                                className='PantryItem-count-button-image'
                                src={increaseIcon}
                                alt='increase'
                            />
                        </button>
                    </div>
                    <button className='PantryItem-grocery-button'>
                        <img src={groceryIcon} alt='add to grocery list' />
                    </button>
                </div>
            </div>
            <div className='PantryItem-border-bottom'></div>
        </div>
    )
}