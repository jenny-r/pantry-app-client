import { useState, useEffect, useMemo } from 'react';
import { GroceryItem } from '../GroceryItem/GroceryItem';
import { AddButton } from '../AddButton/AddButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { GroceryMode, GrocerySort } from '../../types/types';
import { GroceryItemType, PantryItemType } from '../../types/api-types';
import {
    deleteGroceryItems,
    editGroceryItems,
    changeGroceryMode,
    changeGrocerySort,
    toggleChecked,
    setSearchField,
} from '../../store/grocerySlice';
// import { addPantryItem } from '../../store/pantrySlice';
import { SearchBar } from '../SearchBar/SearchBar';
import { Button, ButtonColor } from '../Button/Button';
import { AddGroceryItem } from '../AddGroceryItem/AddGroceryItem';
import { callDeleteGroceryItems } from '../../api';
import './Grocery.css';

export function Grocery() {
    const dispatch = useAppDispatch();
    const [deleteList, setDeleteList] = useState<{ [id: string]: string }>({});
    const [editList, setEditList] = useState<{ [id: string]: GroceryItemType }>({});
    const [errorMessage, setErrorMessage] = useState('');

    const accessToken = useAppSelector((state) => state.user.accessToken);
    const groceryItems: GroceryItemType[] = useAppSelector((state) => Object.values(state.grocery.groceryItems));
    const groceryMode: GroceryMode = useAppSelector((state) => state.grocery.groceryMode);
    const grocerySort: GrocerySort = useAppSelector((state) => state.grocery.grocerySort);
    const searchField: string = useAppSelector((state) => state.grocery.searchField);
    const sortOptionNames: string[] = Object.values(GrocerySort);
    const sortedGroceryItems = useMemo(() => {
        let temp: GroceryItemType[] = [...groceryItems];
        if (grocerySort === GrocerySort.Name) {
            temp.sort((a, b) => a.itemName.localeCompare(b.itemName));
        } else if (grocerySort === GrocerySort.Quantity) {
            temp.sort((n1, n2) => n1.quantity - n2.quantity);
        }
        if (searchField !== '') {
            const lowerCaseSearchField = searchField.toLowerCase();
            temp = temp.filter((item) => item.itemName.toLowerCase().includes(lowerCaseSearchField));
        }
        return temp;
    }, [groceryItems, grocerySort, searchField]);
    const sortedCheckedGroceryItems: GroceryItemType[] = sortedGroceryItems.filter((item) => item.checked === true);

    useEffect(() => {
        setDeleteList({});
        setEditList({});
        setErrorMessage('');
    }, [groceryMode]);

    const addToDeleteList = (id: string, isChecked: boolean) => {
        if (isChecked === true) {
            deleteList[id] = id;
            setDeleteList(deleteList);
        } else {
            delete deleteList[id];
            setDeleteList(deleteList);
        }
    };

    const addToEditList = (groceryItem: GroceryItemType) => {
        editList[groceryItem.id] = groceryItem;
        setEditList(editList);
    };

    const cancelMode = () => {
        dispatch(changeGroceryMode(GroceryMode.Default));
    };

    const handleGroceryItemsDelete = (accessToken: string | null, deleteIdList: string[]) => {
        if (accessToken) {
            callDeleteGroceryItems(accessToken, deleteIdList)
                .then((response) => {
                    if (response.success === true) {
                        dispatch(deleteGroceryItems(deleteIdList));
                        dispatch(changeGroceryMode(GroceryMode.Default));
                        setErrorMessage('');
                    } else {
                        setErrorMessage('Unable to delete. Please try again later.');
                    }
                })
                .catch(() => {
                    setErrorMessage('Unable to delete. Please try again later.');
                });
        }
    };

    const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { options, selectedIndex } = event.target;
        const text: string = options[selectedIndex].text.toLowerCase();

        if (text === 'name') {
            dispatch(changeGrocerySort(GrocerySort.Name));
        } else if (text === 'quantity') {
            dispatch(changeGrocerySort(GrocerySort.Quantity));
        }
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchField(e.target.value));
    };
    const toggleGroceryCheck = (id: string, isChecked: boolean) => {
        dispatch(toggleChecked({ id, isChecked }));
    };

    const addToPantry = (checkedItems: GroceryItemType[]) => {
        const addToPantryList: PantryItemType[] = checkedItems.map((item) => ({
            id: item.id,
            userId: item.userId,
            itemName: item.itemName,
            itemUnit: item.itemUnit,
            quantity: item.quantity,
            updatedAt: item.updatedAt,
        }));
        setDeleteList({});
        setEditList({});
        console.log(addToPantryList);
        // dispatch(addPantryItem(addToPantryList));
        dispatch(deleteGroceryItems(checkedItems.map((item) => item.id)));
    };

    let addButton: any = null;
    if (groceryMode === GroceryMode.Default) {
        addButton = <AddButton onClick={() => dispatch(changeGroceryMode(GroceryMode.Add))} />;
    }

    let addGroceryItemDialogue: any = null;
    if (groceryMode === GroceryMode.Add) {
        addGroceryItemDialogue = <AddGroceryItem itemName={''} itemUnit={''} />;
    }

    let deleteModeButtons: any = null;
    if (groceryMode === GroceryMode.Delete) {
        deleteModeButtons = (
            <div className="Grocery-button-container">
                <div className="Grocery-button-wrapper">
                    <Button buttonText="Cancel" buttonColor={ButtonColor.Gray} onClick={cancelMode} />
                </div>
                <div className="Grocery-button-wrapper">
                    <Button
                        buttonText="Confirm"
                        buttonColor={ButtonColor.Blue}
                        onClick={() => handleGroceryItemsDelete(accessToken, Object.keys(deleteList))}
                    />
                </div>
            </div>
        );
    }

    let editModeButtons: any = null;
    if (groceryMode === GroceryMode.Edit) {
        editModeButtons = (
            <div className="Grocery-button-container">
                <div className="Grocery-button-wrapper">
                    <Button buttonText="Cancel" buttonColor={ButtonColor.Gray} onClick={cancelMode} />
                </div>
                <div className="Grocery-button-wrapper">
                    <Button
                        buttonText="Confirm"
                        buttonColor={ButtonColor.Blue}
                        onClick={() => dispatch(editGroceryItems(editList))}
                    />
                </div>
            </div>
        );
    }

    let errorDialogue: any = null;
    if (errorMessage !== '') {
        errorDialogue = <div className="Grocery-error">{errorMessage}</div>;
    }

    return (
        <div className="Grocery-grocery">
            {errorDialogue}
            <SearchBar
                sortOptionNames={sortOptionNames}
                onClickDelete={() => dispatch(changeGroceryMode(GroceryMode.Delete))}
                onClickEdit={() => dispatch(changeGroceryMode(GroceryMode.Edit))}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
            />
            <div className="Grocery-grocery-item-list">
                <div className="Grocery-grocery-item-unchecked-list">
                    {sortedGroceryItems
                        .filter((item) => item.checked === false)
                        .map((item) => (
                            <GroceryItem
                                item={item}
                                key={item.id}
                                deleteChecked={item.id in deleteList}
                                onClickDeleteCheckbox={addToDeleteList}
                                onChangeEditInput={addToEditList}
                                onClickGroceryCheckbox={toggleGroceryCheck}
                            />
                        ))}
                </div>
                <div className="Grocery-grocery-item-checked-list">
                    <div className="Grocery-checked-header">
                        <div>Checked Items</div>
                        <div
                            className="Grocery-add-to-pantry-button"
                            onClick={() => addToPantry(sortedCheckedGroceryItems)}
                        >
                            Add to Pantry
                        </div>
                    </div>
                    {sortedCheckedGroceryItems.map((item) => (
                        <GroceryItem
                            item={item}
                            key={item.id}
                            deleteChecked={item.id in deleteList}
                            onClickDeleteCheckbox={addToDeleteList}
                            onChangeEditInput={addToEditList}
                            onClickGroceryCheckbox={toggleGroceryCheck}
                        />
                    ))}
                </div>
            </div>
            {addButton}
            {deleteModeButtons}
            {editModeButtons}
            {addGroceryItemDialogue}
        </div>
    );
}
