import { useEffect, useState } from 'react';
import groceryIcon from '../../assets/shopping-cart-icon.png';
import decreaseIcon from '../../assets/minus-icon.png';
import increaseIcon from '../../assets/plus-icon.png';
import { PantryMode } from '../../types/types';
import { PantryItemType } from '../../types/api-types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editPantryItems, onPantryItemsEdit } from '../../store/pantrySlice';
import './PantryItem.css';

interface PantryItemProps {
    item: PantryItemType;
    deleteChecked: boolean;
    onClickDeleteCheckbox: (id: string, isChecked: boolean) => void;
    onChangeEditInput: (pantryItem: PantryItemType) => void;
    onClickAddGroceryItem: (itemName: string, itemUnit: string) => void;
}

export function PantryItem({
    item,
    deleteChecked,
    onClickDeleteCheckbox,
    onChangeEditInput,
    onClickAddGroceryItem,
}: PantryItemProps) {
    const [editedName, setEditedName] = useState(item.itemName);
    const [editedUnit, setEditedUnit] = useState(item.itemUnit);
    const [editedQuantity, setEditedQuantity] = useState(item.quantity);

    const dispatch = useAppDispatch();

    const accessToken = useAppSelector((state) => state.user.accessToken);
    const pantryMode: PantryMode = useAppSelector((state) => state.pantry.pantryMode);

    useEffect(() => {
        setEditedName(item.itemName);
        setEditedUnit(item.itemUnit);
        setEditedQuantity(item.quantity);
    }, [pantryMode, item]);

    const handlePantryItemQuantityChange = (accessToken: string | null, item: PantryItemType, amount: number) => {
        const newQuantity = item.quantity + amount;
        if (newQuantity > 0) {
            const newItem: PantryItemType = {
                id: item.id,
                userId: item.userId,
                itemName: item.itemName,
                itemUnit: item.itemUnit,
                quantity: newQuantity,
                updatedAt: Date.now(),
            };
            const editList: { [id: string]: PantryItemType } = {};
            editList[newItem.id] = newItem;
            onPantryItemsEdit(accessToken, editList)
                .then((editedPantryItems) => {
                    dispatch(editPantryItems(editedPantryItems));
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };

    if (pantryMode === PantryMode.Edit) {
        const handleNameEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditedName(event.target.value);
            onChangeEditInput({
                id: item.id,
                userId: item.userId,
                itemName: event.target.value,
                itemUnit: editedUnit,
                quantity: editedQuantity,
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
                updatedAt: item.updatedAt,
            });
        };
        return (
            <div className="PantryItem-pantry-list-item">
                <div className="PantryItem-item-container">
                    <div className="PantryItem-container-left">
                        <div className="PantryItem-name-container-left">
                            <input
                                className="PantryItem-name-input"
                                id="name"
                                value={editedName}
                                onChange={handleNameEdit}
                            />
                            <input className="PantryItem-unit" id="unit" value={editedUnit} onChange={handleUnitEdit} />
                        </div>
                    </div>
                    <div className="PantryItem-button-container-right">
                        <div className="PantryItem-count-container">
                            <input
                                className="PantryItem-quantity-input"
                                id="quantity"
                                type="number"
                                min="1"
                                value={editedQuantity}
                                onChange={handleQuantityEdit}
                            />
                        </div>
                    </div>
                </div>
                <div className="PantryItem-border-bottom"></div>
            </div>
        );
    }

    let deleteCheckbox = null;
    if (pantryMode === PantryMode.Delete) {
        const deleteCheckboxClick = (cb: React.ChangeEvent<HTMLInputElement>) => {
            onClickDeleteCheckbox(item.id, cb.target.checked);
        };
        deleteCheckbox = (
            <input
                type="checkbox"
                className="PantryItem-delete-checkbox"
                onChange={deleteCheckboxClick}
                checked={deleteChecked}
            />
        );
    }

    return (
        <div className="PantryItem-pantry-list-item">
            <div className="PantryItem-item-container">
                <div className="PantryItem-container-left">
                    <div className="PantryItem-delete-checkbox-container-left">{deleteCheckbox}</div>
                    <div className="PantryItem-name-container-left">
                        <h3 className="PantryItem-name">{item.itemName}</h3>
                        <p className="PantryItem-unit">{item.itemUnit}</p>
                    </div>
                </div>
                <div className="PantryItem-button-container-right">
                    <div className="PantryItem-count-container">
                        <button
                            className="PantryItem-count-button decrease"
                            onClick={() => handlePantryItemQuantityChange(accessToken, item, -1)}
                        >
                            <img className="PantryItem-count-button-image" src={decreaseIcon} alt="decrease" />
                        </button>
                        <div className="PantryItem-quantity">{item.quantity}</div>
                        <button
                            className="PantryItem-count-button increase"
                            onClick={() => handlePantryItemQuantityChange(accessToken, item, 1)}
                        >
                            <img className="PantryItem-count-button-image" src={increaseIcon} alt="increase" />
                        </button>
                    </div>
                    <button
                        className="PantryItem-grocery-button"
                        onClick={() => onClickAddGroceryItem(item.itemName, item.itemUnit)}
                    >
                        <img src={groceryIcon} alt="add to grocery list" />
                    </button>
                </div>
            </div>
            <div className="PantryItem-border-bottom"></div>
        </div>
    );
}
