import React, { useState } from 'react';
import './Tabs.css';

export function Tabs () {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index:number) => {
        setToggleState(index);
    }

    return (
        <div className='container'>
            <div className='tabs-wrapper'>
                <div 
                className={toggleState === 1 ? 'tabs active-tab' : 'tabs'} 
                onClick={() => toggleTab(1)}
                >Pantry</div>
                <div 
                className={toggleState === 2 ? 'tabs active-tab' : 'tabs'} 
                onClick={() => toggleTab(2)}
                >Groceries</div>
                <div 
                className={toggleState === 3 ? 'tabs active-tab' : 'tabs'} 
                onClick={() => toggleTab(3)}
                >Recipes</div>
            </div>

            <div className='content-tabs'>
                <div className={toggleState === 1 ? 'content active-content' : 'content'}>
                    <h2>Pantry placeholder</h2>
                </div>
                <div className={toggleState === 2 ? 'content active-content' : 'content'}>
                    <h2>Groceries placeholder</h2>
                </div>
                <div className={toggleState === 3 ? 'content active-content' : 'content'}>
                    <h2>Recipes placeholder</h2>
                </div>
            </div>
        </div>
    )
}