import React, { useState } from 'react';
import { Button, ButtonColor } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPantryItems, changePantryMode } from '../../store/pantrySlice';
import { PantryMode } from '../../types/types';
import { callAddPantryItem } from '../../api';
import './AddPantryItem.css';

export function AddPantryItem() {
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useAppDispatch();

    const accessToken = useAppSelector((state) => state.user.accessToken);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnit(event.target.value);
    };
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value);
    };

    const addPantryItemModeChange = () => {
        if (accessToken !== null && name.length !== 0 && unit.length !== 0 && quantity.length !== 0) {
            callAddPantryItem(accessToken, {
                itemName: name,
                itemUnit: unit,
                quantity: Number(quantity),
            })
                .then((response) => {
                    if (response.status === true) {
                        dispatch(addPantryItems([response.pantryItem]));
                        setErrorMessage('');
                        dispatch(changePantryMode(PantryMode.Default));
                    } else {
                        setErrorMessage(response.error);
                    }
                })
                .catch(() => {
                    setErrorMessage('please try again later');
                });
        } else {
            alert('Please fill in required fields.');
        }
    };

    let invalidAddPantryItemDialogue: any = null;
    if (errorMessage.length > 0) {
        invalidAddPantryItemDialogue = <div className="AddPantryItem-fail">Unable to add: {errorMessage}</div>;
    }

    return (
        <div className="AddPantryItem-container">
            {invalidAddPantryItemDialogue}
            <div className="AddPantryItem-input-wrapper">
                <div className="AddPantryItem-text-input-container">
                    <input type="text" placeholder="Name" className="AddPantryItem-name" onChange={handleNameChange} />
                    <input type="text" placeholder="Unit" className="AddPantryItem-unit" onChange={handleUnitChange} />
                </div>
                <div className="AddPantryItem-quantity-input-container">
                    <input
                        type="number"
                        placeholder="0"
                        min="0"
                        className="AddPantryItem-quantity"
                        onChange={handleQuantityChange}
                    />
                </div>
            </div>
            <div className="AddPantryItem-button-container">
                <div className="AddPantryItem-button-wrapper">
                    <Button
                        buttonText="Cancel"
                        buttonColor={ButtonColor.Gray}
                        onClick={() => dispatch(changePantryMode(PantryMode.Default))}
                    />
                </div>
                <div className="AddPantryItem-button-wrapper">
                    <Button
                        buttonText="Submit"
                        buttonColor={ButtonColor.Blue}
                        onClick={() => addPantryItemModeChange()}
                    />
                </div>
            </div>
        </div>
    );
}
