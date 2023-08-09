import React, { useEffect, useState } from 'react';
import decreaseIcon from '../../assets/minus-icon.png';
import increaseIcon from '../../assets/plus-icon.png';
import { GroceryMode } from '../../types/types';
import { GroceryItemType } from '../../types/api-types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editGroceryItems, onGroceryItemsEdit } from '../../store/grocerySlice';
import './GroceryItem.css';

interface GroceryItemProps {
    item: GroceryItemType;
    deleteChecked: boolean;
    onClickDeleteCheckbox: (id: string, isChecked: boolean) => void;
    onChangeEditInput: (groceryItem: GroceryItemType) => void;
    onClickGroceryCheckbox: (item: GroceryItemType, isChecked: boolean) => void;
}

export function GroceryItem({
    item,
    deleteChecked,
    onClickDeleteCheckbox,
    onChangeEditInput,
    onClickGroceryCheckbox,
}: GroceryItemProps) {
    const [editedName, setEditedName] = useState(item.itemName);
    const [editedUnit, setEditedUnit] = useState(item.itemUnit);
    const [editedQuantity, setEditedQuantity] = useState(item.quantity);

    const dispatch = useAppDispatch();

    const accessToken = useAppSelector((state) => state.user.accessToken);
    const groceryMode: GroceryMode = useAppSelector((state) => state.grocery.groceryMode);

    useEffect(() => {
        setEditedName(item.itemName);
        setEditedUnit(item.itemUnit);
        setEditedQuantity(item.quantity);
    }, [groceryMode, item]);

    const handleGroceryItemQuantityChange = (accessToken: string | null, item: GroceryItemType, amount: number) => {
        const newQuantity = item.quantity + amount;
        if (newQuantity > 0) {
            const newItem: GroceryItemType = {
                id: item.id,
                userId: item.userId,
                itemName: item.itemName,
                itemUnit: item.itemUnit,
                quantity: newQuantity,
                checked: item.checked,
                updatedAt: Date.now(),
            };
            const editList: { [id: string]: GroceryItemType } = {};
            editList[newItem.id] = newItem;
            onGroceryItemsEdit(accessToken, editList)
                .then((editedGroceryItems) => {
                    dispatch(editGroceryItems(editedGroceryItems));
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };

    if (groceryMode === GroceryMode.Edit) {
        const handleNameEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditedName(event.target.value);
            onChangeEditInput({
                id: item.id,
                userId: item.userId,
                itemName: event.target.value,
                itemUnit: editedUnit,
                quantity: editedQuantity,
                checked: item.checked,
                updatedAt: item.updatedAt,
            });
        };
        const handleUnitEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditedUnit(event.target.value);
            onChangeEditInput({
                id: item.id,
                userId: item.userId,
                itemName: editedName,
                itemUnit: event.target.value,
                quantity: editedQuantity,
                checked: item.checked,
                updatedAt: item.updatedAt,
            });
        };
        const handleQuantityEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditedQuantity(Number(event.target.value));
            onChangeEditInput({
                id: item.id,
                userId: item.userId,
                itemName: editedName,
                itemUnit: editedUnit,
                quantity: Number(event.target.value),
                checked: item.checked,
                updatedAt: item.updatedAt,
            });
        };
        return (
            <div className="GroceryItem-grocery-list-item">
                <div className="GroceryItem-item-container">
                    <div className="GroceryItem-container-left">
                        <div className="GroceryItem-name-container-left">
                            <input
                                className="GroceryItem-name-input"
                                type="text"
                                id="name"
                                value={editedName}
                                onChange={handleNameEdit}
                            />
                            <input
                                className="GroceryItem-unit"
                                type="text"
                                id="unit"
                                value={editedUnit}
                                onChange={handleUnitEdit}
                            />
                        </div>
                    </div>
                    <div className="GroceryItem-button-container-right">
                        <div className="GroceryItem-count-container">
                            <input
                                className="GroceryItem-quantity-input"
                                id="quantity"
                                type="number"
                                min="1"
                                value={editedQuantity}
                                onChange={handleQuantityEdit}
                            />
                        </div>
                    </div>
                </div>
                <div className="GroceryItem-border-bottom"></div>
            </div>
        );
    }

    let deleteCheckbox = null;
    if (groceryMode === GroceryMode.Delete) {
        const deleteCheckboxClick = (cb: React.ChangeEvent<HTMLInputElement>) => {
            onClickDeleteCheckbox(item.id, cb.target.checked);
        };
        deleteCheckbox = (
            <input
                type="checkbox"
                className="GroceryItem-delete-checkbox"
                onChange={deleteCheckboxClick}
                checked={deleteChecked}
            />
        );
    }

    const groceryCheckboxClick = (cb: React.ChangeEvent<HTMLInputElement>) => {
        onClickGroceryCheckbox(item, cb.target.checked);
    };
    let groceryCheckbox = (
        <input
            type="checkbox"
            className="GroceryItem-grocery-checkbox"
            onChange={groceryCheckboxClick}
            checked={item.checked}
        />
    );

    return (
        <div className="GroceryItem-grocery-list-item">
            <div className="GroceryItem-item-container">
                <div className="GroceryItem-container-left">
                    <div className="GroceryItem-delete-checkbox-container-left">{deleteCheckbox}</div>
                    <div className="GroceryItem-name-container-left">
                        <h3 className="GroceryItem-name">{item.itemName}</h3>
                        <p className="GroceryItem-unit">{item.itemUnit}</p>
                    </div>
                </div>
                <div className="GroceryItem-button-container-right">
                    <div className="GroceryItem-count-container">
                        <button
                            className="GroceryItem-count-button decrease"
                            onClick={() => handleGroceryItemQuantityChange(accessToken, item, -1)}
                        >
                            <img className="GroceryItem-count-button-image" src={decreaseIcon} alt="decrease" />
                        </button>
                        <div className="GroceryItem-quantity">{item.quantity}</div>
                        <button
                            className="GroceryItem-count-button increase"
                            onClick={() => handleGroceryItemQuantityChange(accessToken, item, 1)}
                        >
                            <img className="GroceryItem-count-button-image" src={increaseIcon} alt="increase" />
                        </button>
                    </div>
                    <div className="GroceryItem-grocery-checkbox-container-right">{groceryCheckbox}</div>
                </div>
            </div>
            <div className="GroceryItem-border-bottom"></div>
        </div>
    );
}
