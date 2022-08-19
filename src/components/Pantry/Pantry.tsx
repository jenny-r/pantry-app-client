import { PantryItem } from '../PantryItem/PantryItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PantryItemType } from '../../types/types';
import { addPantryItem } from '../../store/pantrySlice';
import './Pantry.css';

export function Pantry() {

    const pantryItems: PantryItemType[] = useAppSelector((state) => Object.values(state.pantry.pantryItems));

    const dispatch = useAppDispatch()

    return (
        <div className='Pantry-pantry-list'>
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
    )
}