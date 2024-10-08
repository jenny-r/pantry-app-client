import { useState, useEffect, useMemo } from 'react';
import { PantryItem } from '../PantryItem/PantryItem';
import { AddButton } from '../AddButton/AddButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PantryMode, PantrySort } from '../../types/types';
import { PantryItemType } from '../../types/api-types';
import {
    editPantryItems,
    changePantryMode,
    changePantrySort,
    setGroceryAdd,
    setSearchField,
    deletePantryItems,
    onPantryItemsEdit,
} from '../../store/pantrySlice';
import { SearchBar } from '../SearchBar/SearchBar';
import { Button, ButtonColor } from '../Button/Button';
import { AddPantryItem } from '../AddPantryItem/AddPantryItem';
import { AddGroceryItem } from '../AddGroceryItem/AddGroceryItem';
import { callDeletePantryItems } from '../../api';
import './Pantry.css';

export function Pantry() {
    const dispatch = useAppDispatch();
    const [deleteList, setDeleteList] = useState<{ [id: string]: string }>({});
    const [editList, setEditList] = useState<{ [id: string]: PantryItemType }>({});
    const [errorMessage, setErrorMessage] = useState('');

    const accessToken = useAppSelector((state) => state.user.accessToken);
    const pantryItems: PantryItemType[] = useAppSelector((state) => Object.values(state.pantry.pantryItems));
    const pantryMode: PantryMode = useAppSelector((state) => state.pantry.pantryMode);
    const pantrySort: PantrySort = useAppSelector((state) => state.pantry.pantrySort);
    const groceryAdd: { itemName: string; itemUnit: string } = useAppSelector((state) => state.pantry.groceryAdd);
    const searchField: string = useAppSelector((state) => state.pantry.searchField);
    const sortOptionNames: string[] = Object.values(PantrySort);
    const sortedPantryItems = useMemo(() => {
        let temp: PantryItemType[] = [...pantryItems];
        if (pantrySort === PantrySort.Name) {
            temp.sort((a, b) => a.itemName.localeCompare(b.itemName));
        } else if (pantrySort === PantrySort.Quantity) {
            temp.sort((n1, n2) => n1.quantity - n2.quantity);
        }
        if (searchField !== '') {
            const lowerCaseSearchField = searchField.toLowerCase();
            temp = temp.filter((item) => item.itemName.toLowerCase().includes(lowerCaseSearchField));
        }
        return temp;
    }, [pantryItems, pantrySort, searchField]);

    useEffect(() => {
        setDeleteList({});
        setEditList({});
        setErrorMessage('');
    }, [pantryMode]);

    const addToDeleteList = (id: string, isChecked: boolean) => {
        if (isChecked === true) {
            deleteList[id] = id;
            setDeleteList(deleteList);
        } else {
            delete deleteList[id];
            setDeleteList(deleteList);
        }
    };

    const addToEditList = (pantryItem: PantryItemType) => {
        editList[pantryItem.id] = pantryItem;
        setEditList(editList);
    };

    const cancelMode = () => {
        dispatch(changePantryMode(PantryMode.Default));
    };

    const handlePantryItemsDelete = (accessToken: string | null, deleteIdList: string[]) => {
        if (accessToken) {
            callDeletePantryItems(accessToken, deleteIdList)
                .then((response) => {
                    if (response.success === true) {
                        dispatch(deletePantryItems(deleteIdList));
                        dispatch(changePantryMode(PantryMode.Default));
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

    const handlePantryItemsEdit = (accessToken: string | null, editList: { [id: string]: PantryItemType }) => {
        onPantryItemsEdit(accessToken, editList)
            .then((editedPantryItems) => {
                dispatch(editPantryItems(editedPantryItems));
                dispatch(changePantryMode(PantryMode.Default));
                setErrorMessage('');
            })
            .catch((error) => {
                setErrorMessage(error);
            });
    };

    const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { options, selectedIndex } = event.target;
        const text: string = options[selectedIndex].text.toLowerCase();

        if (text === 'name') {
            dispatch(changePantrySort(PantrySort.Name));
        } else if (text === 'quantity') {
            dispatch(changePantrySort(PantrySort.Quantity));
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchField(e.target.value));
    };

    const toggleGroceryItemDialogue = (itemName: string, itemUnit: string) => {
        dispatch(setGroceryAdd({ itemName: itemName, itemUnit: itemUnit }));
        dispatch(changePantryMode(PantryMode.AddToGrocery));
    };

    let addGroceryItemDialogue: any = null;
    if (pantryMode === PantryMode.AddToGrocery) {
        addGroceryItemDialogue = <AddGroceryItem itemName={groceryAdd.itemName} itemUnit={groceryAdd.itemUnit} />;
    }

    let addButton: any = null;
    if (pantryMode === PantryMode.Default) {
        addButton = <AddButton onClick={() => dispatch(changePantryMode(PantryMode.Add))} />;
    }

    let addPantryItemDialogue: any = null;
    if (pantryMode === PantryMode.Add) {
        addPantryItemDialogue = <AddPantryItem />;
    }

    let deleteModeButtons: any = null;
    if (pantryMode === PantryMode.Delete) {
        deleteModeButtons = (
            <div className="Pantry-button-container">
                <div className="Pantry-button-wrapper">
                    <Button buttonText="Cancel" buttonColor={ButtonColor.Gray} onClick={cancelMode} />
                </div>
                <div className="Pantry-button-wrapper">
                    <Button
                        buttonText="Confirm"
                        buttonColor={ButtonColor.Blue}
                        onClick={() => handlePantryItemsDelete(accessToken, Object.keys(deleteList))}
                    />
                </div>
            </div>
        );
    }

    let editModeButtons: any = null;
    if (pantryMode === PantryMode.Edit) {
        editModeButtons = (
            <div className="Pantry-button-container">
                <div className="Pantry-button-wrapper">
                    <Button buttonText="Cancel" buttonColor={ButtonColor.Gray} onClick={cancelMode} />
                </div>
                <div className="Pantry-button-wrapper">
                    <Button
                        buttonText="Confirm"
                        buttonColor={ButtonColor.Blue}
                        onClick={() => handlePantryItemsEdit(accessToken, editList)}
                    />
                </div>
            </div>
        );
    }

    let errorDialogue: any = null;
    if (errorMessage !== '') {
        errorDialogue = <div className="Pantry-error">{errorMessage}</div>;
    }

    return (
        <div className="Pantry-pantry">
            {errorDialogue}
            <SearchBar
                sortOptionNames={sortOptionNames}
                onClickDelete={() => dispatch(changePantryMode(PantryMode.Delete))}
                onClickEdit={() => dispatch(changePantryMode(PantryMode.Edit))}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
            />
            <div className="Pantry-pantry-item-list-container">
                {sortedPantryItems.map((item) => (
                    <PantryItem
                        item={item}
                        key={item.id}
                        deleteChecked={item.id in deleteList}
                        onClickDeleteCheckbox={addToDeleteList}
                        onChangeEditInput={addToEditList}
                        onClickAddGroceryItem={toggleGroceryItemDialogue}
                    />
                ))}
                <div className="Pantry-spacer" />
            </div>
            {addButton}
            {deleteModeButtons}
            {editModeButtons}
            {addPantryItemDialogue}
            {addGroceryItemDialogue}
        </div>
    );
}
