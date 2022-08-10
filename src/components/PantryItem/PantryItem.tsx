import groceryIcon from '../../assets/shopping-cart-icon.png';
import './PantryItem.css';

interface PantryItemProps {
    item: PantryItemType;
}

export interface PantryItemType {
    name: string;
    type: string;
    quantity: number;
}

export function PantryItem({ item }: PantryItemProps) {
    return (
        <div className='PantryItem-pantry-list-item'>
            <div className='PantryItem-item-container'>
                <div className='PantryItem-name-container-left'>
                    <h3 className='PantryItem-name'>{item.name}</h3>
                    <p className='PantryItem-type'>{item.type}</p>
                </div>
                <div className='PantryItem-button-container-right'>
                    <div className='PantryItem-count-container'>
                        <button className='PantryItem-count-button decrease'>-</button>
                        <div className='PantryItem-quantity'>{item.quantity}</div>
                        <button className='PantryItem-count-button increase'>+</button>
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