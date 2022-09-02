import { PantryItem } from '../PantryItem/PantryItem';
import { AddButton } from '../AddButton/AddButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PantryItemType, PantryMode } from '../../types/types';
import { addPantryItem, changePantryMode } from '../../store/pantrySlice';
import { SearchBar } from '../SearchBar/SearchBar';
import './Pantry.css';

export function Pantry() {

    const pantryItems: PantryItemType[] = useAppSelector((state) => Object.values(state.pantry.pantryItems));

    const dispatch = useAppDispatch()

    return (
        <div className='Pantry-pantry'>
            <SearchBar onClickDelete={() => dispatch(changePantryMode(PantryMode.Delete))} onClickEdit={() => dispatch(changePantryMode(PantryMode.Edit))} />
            <div className='Pantry-pantry-item-list'>
                <button
                    onClick={() => dispatch(addPantryItem({
                        id: '18',
                        name: 'Kale',
                        unit: 'Single',
                        quantity: 4
                    }))}
                >Add item</button>
                {pantryItems.map((item) =>
                    <PantryItem item={item} key={item.name} />)}
            </div>
            <AddButton />
        </div>
    )
}