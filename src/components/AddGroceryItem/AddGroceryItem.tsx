import React, { useState } from 'react';
import { Button, ButtonColor } from '../Button/Button';
import { useAppDispatch } from '../../store/hooks';
import { addGroceryItem, changeGroceryMode } from '../../store/grocerySlice';
import { GroceryMode } from '../../types/types';
import './AddGroceryItem.css';

export function AddGroceryItem() {
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState('');

    const dispatch = useAppDispatch()

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnit(event.target.value);
    }
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value);
    }

    const addGroceryItemModeChange = () => {
        if (name.length !== 0 && unit.length !== 0 && quantity.length !== 0) {
            dispatch(addGroceryItem({
                id: '8',
                name: name,
                unit: unit,
                quantity: Number(quantity),
                checked: false
            }));
            dispatch(changeGroceryMode(GroceryMode.Default));
        } else {
            alert('Please fill in required fields.');
        }
    }

    return (
        <div className='AddGroceryItem-container'>
            <div className='AddGroceryItem-input-wrapper'>
                <div className='AddGroceryItem-text-input-container'>
                    <input type='text' placeholder='Name' className='AddGroceryItem-name' onChange={handleNameChange} />
                    <input type='text' placeholder='Unit' className='AddGroceryItem-unit' onChange={handleUnitChange} />
                </div>
                <div className='AddGroceryItem-quantity-input-container'>
                    <input type='number' placeholder='0' className='AddGroceryItem-quantity' onChange={handleQuantityChange} />
                </div>
            </div>
            <div className='AddGroceryItem-button-container'>
                <div className='AddGroceryItem-button-wrapper'>
                    <Button buttonText='Cancel' buttonColor={ButtonColor.Gray} onClick={() => dispatch(changeGroceryMode(GroceryMode.Default))} />
                </div>
                <div className='AddGroceryItem-button-wrapper'>
                    <Button buttonText='Submit' buttonColor={ButtonColor.Blue} onClick={() => addGroceryItemModeChange()} />
                </div>
            </div>
        </div>
    )
}