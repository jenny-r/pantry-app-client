import groceryIcon from '../../assets/shopping-cart-icon.png';

interface PantryItemProps {
    item: PantryItemType;
}

export interface PantryItemType {
    name: string;
    type: string;
    quantity: number;
}

declare module 'edit-pencil-icon.png'

export function PantryItem({ item }: PantryItemProps) {
    return (
        <li className='pantry-list-item'>
            <div className='item-container'>
                <div className='name-container-left'>
                    <h3 className='name'>{item.name}</h3>
                    <p className='type'>{item.type}</p>
                </div>
                <div className='button-container-right'>
                    <div className='count-container'>
                        <button className='count-button decrease'>-</button>
                        <div className='quantity'>{item.quantity}</div>
                        <button className='count-button increase'>+</button>
                    </div>
                    <button className='grocery-button'>
                        <img src={groceryIcon} alt='add to grocery list' />
                    </button>
                </div>
            </div>
            <div className='border-bottom-wrapper'>
                <div className='border-bottom'></div>
            </div>
        </li>
    )
}