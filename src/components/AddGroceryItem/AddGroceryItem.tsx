import React, { useState } from 'react';
import { Button, ButtonColor } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addGroceryItem, changeGroceryMode } from '../../store/grocerySlice';
import { GroceryMode } from '../../types/types';
import { changePantryMode, setGroceryAdd } from '../../store/pantrySlice';
import { PantryMode } from '../../types/types';
import { callAddGroceryItem } from '../../api';
import './AddGroceryItem.css';

interface AddGroceryItemProps {
    itemName: string;
    itemUnit: string;
}

export function AddGroceryItem({ itemName, itemUnit }: AddGroceryItemProps) {
    const [name, setName] = useState(itemName);
    const [unit, setUnit] = useState(itemUnit);
    const [quantity, setQuantity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const groceryMode: GroceryMode = useAppSelector((state) => state.grocery.groceryMode);
    const pantryMode: PantryMode = useAppSelector((state) => state.pantry.pantryMode);

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
    const handleModeChange = () => {
        if (groceryMode === GroceryMode.Add) {
            dispatch(changeGroceryMode(GroceryMode.Default));
        }
        if (pantryMode === PantryMode.AddToGrocery) {
            dispatch(changePantryMode(PantryMode.Default));
            dispatch(setGroceryAdd({ itemName: '', itemUnit: '' }));
        }
    };
    const addGroceryItemModeChange = () => {
        if (accessToken !== null && name.length !== 0 && unit.length !== 0 && quantity.length !== 0) {
            callAddGroceryItem(accessToken, {
                itemName: name,
                itemUnit: unit,
                quantity: Number(quantity),
            })
                .then((response) => {
                    if (response.status === true) {
                        dispatch(addGroceryItem(response.groceryItem));
                        setErrorMessage('');
                        handleModeChange();
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

    let groceryTextInput = null;
    if (itemName !== '') {
        groceryTextInput = (
            <div className="AddGroceryItem-text-input-container">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    className="AddGroceryItem-name"
                    onChange={handleNameChange}
                />
                <input
                    type="text"
                    placeholder="Unit"
                    value={unit}
                    className="AddGroceryItem-unit"
                    onChange={handleUnitChange}
                />
            </div>
        );
    } else {
        groceryTextInput = (
            <div className="AddGroceryItem-text-input-container">
                <input type="text" placeholder="Name" className="AddGroceryItem-name" onChange={handleNameChange} />
                <input type="text" placeholder="Unit" className="AddGroceryItem-unit" onChange={handleUnitChange} />
            </div>
        );
    }

    let invalidAddGrcoeryItemDialogue: any = null;
    if (errorMessage.length > 0) {
        invalidAddGrcoeryItemDialogue = <div className="AddGroceryItem-fail">Unable to add: {errorMessage}</div>;
    }

    return (
        <div className="AddGroceryItem-container">
            {invalidAddGrcoeryItemDialogue}
            <div className="AddGroceryItem-input-wrapper">
                {groceryTextInput}
                <div className="AddGroceryItem-quantity-input-container">
                    <input
                        type="number"
                        placeholder="0"
                        className="AddGroceryItem-quantity"
                        onChange={handleQuantityChange}
                    />
                </div>
            </div>
            <div className="AddGroceryItem-button-container">
                <div className="AddGroceryItem-button-wrapper">
                    <Button buttonText="Cancel" buttonColor={ButtonColor.Gray} onClick={() => handleModeChange()} />
                </div>
                <div className="AddGroceryItem-button-wrapper">
                    <Button
                        buttonText="Submit"
                        buttonColor={ButtonColor.Blue}
                        onClick={() => addGroceryItemModeChange()}
                    />
                </div>
            </div>
        </div>
    );
}
