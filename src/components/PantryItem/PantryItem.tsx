import { useState } from 'react';
import groceryIcon from '../../assets/shopping-cart-icon.png';
import decreaseIcon from '../../assets/minus-icon.png';
import increaseIcon from '../../assets/plus-icon.png';
import { PantryMode, PantryItemType } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { increase, decrease } from '../../store/pantrySlice';
import './PantryItem.css';

interface PantryItemProps {
    item: PantryItemType;
    onClickDeleteCheckbox: (id: string, isChecked: boolean) => void;
    onChangeEditInput: (pantryItem: PantryItemType) => void;
}

export function PantryItem({ item, onClickDeleteCheckbox, onChangeEditInput }: PantryItemProps) {
    const [editedName, setEditedName] = useState(item.name);
    const [editedUnit, setEditedUnit] = useState(item.unit);
    const [editedQuantity, setEditedQuantity] = useState(item.quantity);

    const dispatch = useAppDispatch();

    const pantryMode: PantryMode = useAppSelector((state) => state.pantry.pantryMode);

    if (pantryMode === PantryMode.Edit) {
        const handleNameEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditedName(event.target.value);
            onChangeEditInput(
                {
                    id: item.id,
                    name: event.target.value,
                    unit: editedUnit,
                    quantity: editedQuantity
                }
            )
        }
        const handleUnitEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditedUnit(event.target.value);
            onChangeEditInput(
                {
                    id: item.id,
                    name: editedName,
                    unit: event.target.value,
                    quantity: editedQuantity
                }
            )
        }
        const handleQuantityEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditedQuantity(Number(event.target.value));
            onChangeEditInput(
                {
                    id: item.id,
                    name: editedName,
                    unit: editedUnit,
                    quantity: Number(event.target.value)
                }
            )
        }
        return (
            <div className='PantryItem-pantry-list-item'>
                <div className='PantryItem-item-container'>
                    <div className='PantryItem-checkbox-container-left'>
                        <div className='PantryItem-name-container-left'>
                            <input className='PantryItem-name-input' id='name' defaultValue={item.name} onChange={handleNameEdit} />
                            <input className='PantryItem-unit' id='unit' defaultValue={item.unit} onChange={handleUnitEdit} />
                        </div>
                    </div>
                    <div className='PantryItem-button-container-right'>
                        <div className='PantryItem-count-container'>
                            <input className='PantryItem-quantity-input' id='quantity' defaultValue={item.quantity} onChange={handleQuantityEdit} />
                        </div>
                    </div>
                </div>
                <div className='PantryItem-border-bottom'></div>
            </div>
        )
    }

    let checkbox = null;
    if (pantryMode === PantryMode.Delete) {
        const deleteCheckboxClick = (cb: React.ChangeEvent<HTMLInputElement>) => {
            onClickDeleteCheckbox(item.id, cb.target.checked);
        }
        checkbox = (<input type='checkbox' className='PantryItem-checkbox' onChange={deleteCheckboxClick} />)
    }

    return (
        <div className='PantryItem-pantry-list-item'>
            <div className='PantryItem-item-container'>
                <div className='PantryItem-checkbox-container-left'>
                    {checkbox}
                    <div className='PantryItem-name-container-left'>
                        <h3 className='PantryItem-name'>{item.name}</h3>
                        <p className='PantryItem-unit'>{item.unit}</p>
                    </div>
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