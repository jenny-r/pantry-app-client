import React from 'react';
import { PantryItem, PantryItemType } from './PantryItem';
import './Pantry.css';

interface UserPantry {
    pantryItemData: Array<any>;
}

export function Pantry() {

    const fakeItems: PantryItemType[] = [{
        name: 'Milk',
        type: 'Carton',
        quantity: 2
    }, {
        name: 'Banana',
        type: 'Single',
        quantity: 1
    }, {
        name: 'Tuna',
        type: 'Can',
        quantity: 3
    }, {
        name: 'Bread',
        type: 'Loaf',
        quantity: 1
    }, {
        name: 'Orange juice',
        type: 'Carton',
        quantity: 1
    }, {
        name: 'Bacon',
        type: 'Package',
        quantity: 1
    }, {
        name: 'Potato',
        type: 'Single',
        quantity: 6
    }, {
        name: 'Flour',
        type: 'Container',
        quantity: 1
    }, {
        name: 'Apple',
        type: 'Single',
        quantity: 3
    }, {
        name: 'Peanuts',
        type: 'Pack',
        quantity: 1
    }, {
        name: 'Fruit snacks',
        type: 'Single',
        quantity: 10
    }, {
        name: 'Beans',
        type: 'Can',
        quantity: 4
    }, {
        name: 'Olives',
        type: 'Jar',
        quantity: 1
    }, {
        name: 'Rice',
        type: 'Pack',
        quantity: 1
    }, {
        name: 'Sugar',
        type: 'Container',
        quantity: 1
    }, {
        name: 'Vanilla extract',
        type: 'Bottle',
        quantity: 1
    }, {
        name: 'Carrot',
        type: 'Single',
        quantity: 4
    }];

    const content = fakeItems.map((item) =>
        <PantryItem item={item} />)

    return (
        <div className='pantry-list'>
            <ul>
                {content}
            </ul>
        </div>
    )
}

//make pantry item component