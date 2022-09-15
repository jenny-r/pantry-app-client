import { useState, useEffect } from 'react'
import { PantryItem } from '../PantryItem/PantryItem';
import { AddButton } from '../AddButton/AddButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PantryItemType, PantryMode } from '../../types/types';
import { deletePantryItems, editPantryItems, changePantryMode } from '../../store/pantrySlice';
import { SearchBar } from '../SearchBar/SearchBar';
import { Button, ButtonColor } from '../Button/Button';
import { AddPantryItem } from '../AddPantryItem/AddPantryItem';
import './Pantry.css';

export function Pantry() {
    const dispatch = useAppDispatch()
    const [deleteList, setDeleteList] = useState<{ [id: string]: string }>({});
    const [editList, setEditList] = useState<{ [id: string]: PantryItemType }>({});

    const pantryItems: PantryItemType[] = useAppSelector((state) => Object.values(state.pantry.pantryItems));
    const pantryMode: PantryMode = useAppSelector((state) => state.pantry.pantryMode);

    useEffect(() => {
        setDeleteList({});
    }, [pantryMode]);

    const addToDeleteList = (id: string, isChecked: boolean) => {
        if (isChecked === true) {
            deleteList[id] = id;
            setDeleteList(deleteList);
        } else {
            delete deleteList[id];
            setDeleteList(deleteList);
        }
    }
    const addToEditList = (pantryItem: PantryItemType) => {
        editList[pantryItem.id] = pantryItem;
        setEditList(editList);
        console.log(editList)
    }
    const cancelMode = () => {
        dispatch(changePantryMode(PantryMode.Default));
    }

    let addButton: any = null;
    if (pantryMode === PantryMode.Default) {
        addButton = (
            <AddButton
                onClick={() => dispatch(changePantryMode(PantryMode.Add))}
            />
        );
    }

    let addPantryItemDialogue: any = null;
    if (pantryMode === PantryMode.Add) {
        addPantryItemDialogue = (
            <AddPantryItem />
        )
    }

    let deleteModeButtons: any = null;
    if (pantryMode === PantryMode.Delete) {
        deleteModeButtons = (
            <div className='Pantry-button-container'>
                <div className='Pantry-button-wrapper'>
                    <Button buttonText='Cancel' buttonColor={ButtonColor.Gray} onClick={cancelMode} />
                </div>
                <div className='Pantry-button-wrapper'>
                    <Button buttonText='Confirm' buttonColor={ButtonColor.Blue} onClick={() => dispatch(deletePantryItems(Object.keys(deleteList)))} />
                </div>
            </div>
        );
    }

    let editModeButtons: any = null;
    if (pantryMode === PantryMode.Edit) {
        editModeButtons = (
            <div className='Pantry-button-container'>
                <div className='Pantry-button-wrapper'>
                    <Button buttonText='Cancel' buttonColor={ButtonColor.Gray} onClick={cancelMode} />
                </div>
                <div className='Pantry-button-wrapper'>
                    <Button buttonText='Confirm' buttonColor={ButtonColor.Blue} onClick={() => dispatch(editPantryItems(editList))} />
                </div>
            </div>
        );
    }

    return (
        <div className='Pantry-pantry'>
            <SearchBar onClickDelete={() => dispatch(changePantryMode(PantryMode.Delete))} onClickEdit={() => dispatch(changePantryMode(PantryMode.Edit))} />
            <div className='Pantry-pantry-item-list'>
                {pantryItems.map((item) =>
                    <PantryItem item={item} key={item.name} onClickDeleteCheckbox={addToDeleteList} onChangeEditInput={addToEditList} />)}
            </div>
            {addButton}
            {deleteModeButtons}
            {editModeButtons}
            {addPantryItemDialogue}
        </div>
    )
}