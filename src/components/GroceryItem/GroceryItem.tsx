import React, { useState } from 'react';
import decreaseIcon from '../../assets/minus-icon.png';
import increaseIcon from '../../assets/plus-icon.png';
import { GroceryMode, GroceryItemType } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { increase, decrease } from '../../store/grocerySlice';
import './GroceryItem.css';

interface GroceryItemProps {
    item: GroceryItemType;
    onClickDeleteCheckbox: (id: string, isChecked: boolean) => void;
    onChangeEditInput: (groceryItem: GroceryItemType) => void;
    onClickGroceryCheckbox: (id: string, isChecked: boolean) => void;
}

export function GroceryItem({ item, onClickDeleteCheckbox, onChangeEditInput, onClickGroceryCheckbox }: GroceryItemProps) {
    const [editedName, setEditedName] = useState(item.name);
    const [editedUnit, setEditedUnit] = useState(item.unit);
    const [editedQuantity, setEditedQuantity] = useState(item.quantity);

    const dispatch = useAppDispatch();

    const groceryMode: GroceryMode = useAppSelector((state) => state.grocery.groceryMode);

    if (groceryMode === GroceryMode.Edit) {
        const handleNameEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditedName(event.target.value);
            onChangeEditInput(
                {
                    id: item.id,
                    name: event.target.value,
                    unit: editedUnit,
                    quantity: editedQuantity,
                    checked: item.checked
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
                    quantity: editedQuantity,
                    checked: item.checked
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
                    quantity: Number(event.target.value),
                    checked: item.checked
                }
            )
        }
        return (
            <div className='GroceryItem-grocery-list-item'>
                <div className='GroceryItem-item-container'>
                    <div className='GroceryItem-container-left'>
                        <div className='GroceryItem-name-container-left'>
                            <input className='GroceryItem-name-input' id='name' defaultValue={item.name} onChange={handleNameEdit} />
                            <input className='GroceryItem-unit' id='unit' defaultValue={item.unit} onChange={handleUnitEdit} />
                        </div>
                    </div>
                    <div className='GroceryItem-button-container-right'>
                        <div className='GroceryItem-count-container'>
                            <input className='GroceryItem-quantity-input' id='quantity' defaultValue={item.quantity} onChange={handleQuantityEdit} />
                        </div>
                    </div>
                </div>
                <div className='GroceryItem-border-bottom'></div>
            </div>
        )
    }

    let deleteCheckbox = null;
    if (groceryMode === GroceryMode.Delete) {
        const deleteCheckboxClick = (cb: React.ChangeEvent<HTMLInputElement>) => {
            onClickDeleteCheckbox(item.id, cb.target.checked);
        }
        deleteCheckbox = (<input type='checkbox' className='GroceryItem-delete-checkbox' onChange={deleteCheckboxClick} />)
    }

    const groceryCheckboxClick = (cb: React.ChangeEvent<HTMLInputElement>) => {
        onClickGroceryCheckbox(item.id, cb.target.checked);
    }
    let groceryCheckbox = (<input type='checkbox' className='GroceryItem-grocery-checkbox' onChange={groceryCheckboxClick} checked={false} />);
    if (item.checked === true) {
        groceryCheckbox = (<input type='checkbox' className='GroceryItem-grocery-checkbox' onChange={groceryCheckboxClick} checked />);
    }

    return (
        <div className='GroceryItem-grocery-list-item'>
            <div className='GroceryItem-item-container'>
                <div className='GroceryItem-container-left'>
                    <div className='GroceryItem-delete-checkbox-container-left'>
                        {deleteCheckbox}
                    </div>
                    <div className='GroceryItem-name-container-left'>
                        <h3 className='GroceryItem-name'>{item.name}</h3>
                        <p className='GroceryItem-unit'>{item.unit}</p>
                    </div>
                </div>
                <div className='GroceryItem-button-container-right'>
                    <div className='GroceryItem-count-container'>
                        <button
                            className='GroceryItem-count-button decrease'
                            onClick={() => dispatch(decrease(item.id))}
                        >
                            <img
                                className='GroceryItem-count-button-image'
                                src={decreaseIcon}
                                alt='decrease'
                            />
                        </button>
                        <div className='GroceryItem-quantity'>{item.quantity}</div>
                        <button
                            className='GroceryItem-count-button increase'
                            onClick={() => dispatch(increase(item.id))}
                        >
                            <img
                                className='GroceryItem-count-button-image'
                                src={increaseIcon}
                                alt='increase'
                            />
                        </button>
                    </div>
                    <div className='GroceryItem-grocery-checkbox-container-right'>
                        {groceryCheckbox}
                    </div>
                </div>
            </div>
            <div className='GroceryItem-border-bottom'></div>
        </div>
    )
}