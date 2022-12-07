import { useState, useEffect, useMemo } from 'react'
import { GroceryItem } from '../GroceryItem/GroceryItem';
import { AddButton } from '../AddButton/AddButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { GroceryItemType, GroceryMode, GrocerySort } from '../../types/types';
import { deleteGroceryItems, editGroceryItems, changeGroceryMode, changeGrocerySort, toggleChecked, setSearchField } from '../../store/grocerySlice';
import { SearchBar } from '../SearchBar/SearchBar';
import { Button, ButtonColor } from '../Button/Button';
import { AddGroceryItem } from '../AddGroceryItem/AddGroceryItem';
import './Grocery.css';

export function Grocery() {
    const dispatch = useAppDispatch()
    const [deleteList, setDeleteList] = useState<{ [id: string]: string }>({});
    const [editList, setEditList] = useState<{ [id: string]: GroceryItemType }>({});

    const groceryItems: GroceryItemType[] = useAppSelector((state) => Object.values(state.grocery.groceryItems));
    const groceryMode: GroceryMode = useAppSelector((state) => state.grocery.groceryMode);
    const grocerySort: GrocerySort = useAppSelector((state) => state.grocery.grocerySort);
    const searchField: string = useAppSelector((state) => state.grocery.searchField);
    const sortOptionNames: string[] = Object.values(GrocerySort);
    const sortedGroceryItems = useMemo(() => {
        let temp: GroceryItemType[] = [...groceryItems];
        if (grocerySort === GrocerySort.Name) {
            temp.sort((a, b) => a.name.localeCompare(b.name));
        } else if (grocerySort === GrocerySort.Quantity) {
            temp.sort((n1, n2) => n1.quantity - n2.quantity);
        }
        if (searchField !== '') {
            const lowerCaseSearchField = searchField.toLowerCase();
            temp = temp.filter(item => item.name.toLowerCase().includes(lowerCaseSearchField));
        }
        return temp;
    }, [groceryItems, grocerySort, searchField])

    useEffect(() => {
        setDeleteList({});
    }, [groceryMode]);

    const addToDeleteList = (id: string, isChecked: boolean) => {
        if (isChecked === true) {
            deleteList[id] = id;
            setDeleteList(deleteList);
        } else {
            delete deleteList[id];
            setDeleteList(deleteList);
        }
    }
    const addToEditList = (groceryItem: GroceryItemType) => {
        editList[groceryItem.id] = groceryItem;
        setEditList(editList);
        console.log(editList)
    }
    const cancelMode = () => {
        dispatch(changeGroceryMode(GroceryMode.Default));
    }
    const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { options, selectedIndex } = event.target;
        const text: string = options[selectedIndex].text.toLowerCase();

        if (text === 'name') {
            dispatch(changeGrocerySort(GrocerySort.Name))
        } else if (text === 'quantity') {
            dispatch(changeGrocerySort(GrocerySort.Quantity))
        }
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchField(e.target.value));
    }
    const toggleGroceryCheck = (id: string, isChecked: boolean) => {
        dispatch(toggleChecked({ [id]: isChecked }));
    }

    let addButton: any = null;
    if (groceryMode === GroceryMode.Default) {
        addButton = (
            <AddButton
                onClick={() => dispatch(changeGroceryMode(GroceryMode.Add))}
            />
        );
    }

    let addGroceryItemDialogue: any = null;
    if (groceryMode === GroceryMode.Add) {
        addGroceryItemDialogue = (
            <AddGroceryItem />
        )
    }

    let deleteModeButtons: any = null;
    if (groceryMode === GroceryMode.Delete) {
        deleteModeButtons = (
            <div className='Grocery-button-container'>
                <div className='Grocery-button-wrapper'>
                    <Button buttonText='Cancel' buttonColor={ButtonColor.Gray} onClick={cancelMode} />
                </div>
                <div className='Grocery-button-wrapper'>
                    <Button buttonText='Confirm' buttonColor={ButtonColor.Blue} onClick={() => dispatch(deleteGroceryItems(Object.keys(deleteList)))} />
                </div>
            </div>
        );
    }

    let editModeButtons: any = null;
    if (groceryMode === GroceryMode.Edit) {
        editModeButtons = (
            <div className='Grocery-button-container'>
                <div className='Grocery-button-wrapper'>
                    <Button buttonText='Cancel' buttonColor={ButtonColor.Gray} onClick={cancelMode} />
                </div>
                <div className='Grocery-button-wrapper'>
                    <Button buttonText='Confirm' buttonColor={ButtonColor.Blue} onClick={() => dispatch(editGroceryItems(editList))} />
                </div>
            </div>
        );
    }

    return (
        <div className='Grocery-grocery'>
            <SearchBar
                sortOptionNames={sortOptionNames}
                onClickDelete={() => dispatch(changeGroceryMode(GroceryMode.Delete))}
                onClickEdit={() => dispatch(changeGroceryMode(GroceryMode.Edit))}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
            />
            <div className='Grocery-grocery-item-list'>
                {sortedGroceryItems.map((item) =>
                    <GroceryItem item={item} key={item.name} onClickDeleteCheckbox={addToDeleteList} onChangeEditInput={addToEditList} onClickGroceryCheckbox={toggleGroceryCheck} />)}
            </div>
            {addButton}
            {deleteModeButtons}
            {editModeButtons}
            {addGroceryItemDialogue}
        </div>
    )
}