import React from 'react';
import { Tabs } from '../Tabs/Tabs';
import './Navigation.css';

export function Navigation () {
    return (
        <div className='navigation'>
            <nav className='navbar'>
                    <h1 className='app-name'>My Pantry</h1>
                    <div className='sign-out-button'>Sign Out</div>
            </nav>
            <Tabs/>
        </div>
    )
}