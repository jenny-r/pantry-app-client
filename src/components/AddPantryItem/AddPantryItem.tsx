import React, { useState } from 'react';
import { Button, ButtonColor } from '../Button/Button';
import { useAppDispatch } from '../../store/hooks';
import { addPantryItems, changePantryMode } from '../../store/pantrySlice';
import { PantryMode } from '../../types/types';
import './AddPantryItem.css';

export function AddPantryItem() {
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

    const addPantryItemModeChange = () => {
        if (name.length !== 0 && unit.length !== 0 && quantity.length !== 0) {
            dispatch(addPantryItems([{
                id: '18',
                name: name,
                unit: unit,
                quantity: Number(quantity)
            }]));
            dispatch(changePantryMode(PantryMode.Default));
        } else {
            alert('Please fill in required fields.');
        }
    }

    return (
        <div className='AddPantryItem-container'>
            <div className='AddPantryItem-input-wrapper'>
                <div className='AddPantryItem-text-input-container'>
                    <input type='text' placeholder='Name' className='AddPantryItem-name' onChange={handleNameChange} />
                    <input type='text' placeholder='Unit' className='AddPantryItem-unit' onChange={handleUnitChange} />
                </div>
                <div className='AddPantryItem-quantity-input-container'>
                    <input type='number' placeholder='0' className='AddPantryItem-quantity' onChange={handleQuantityChange} />
                </div>
            </div>
            <div className='AddPantryItem-button-container'>
                <div className='AddPantryItem-button-wrapper'>
                    <Button buttonText='Cancel' buttonColor={ButtonColor.Gray} onClick={() => dispatch(changePantryMode(PantryMode.Default))} />
                </div>
                <div className='AddPantryItem-button-wrapper'>
                    <Button buttonText='Submit' buttonColor={ButtonColor.Blue} onClick={() => addPantryItemModeChange()} />
                </div>
            </div>
        </div>
    )
}