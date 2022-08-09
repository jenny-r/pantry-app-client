import React from 'react';
import './Navigation.css';

export function Navigation () {
    return (
        <nav className='navbar'>
                <h1 className='app-name'>My Pantry</h1>
                <div className='nav-buttons'>
                    <div className='sign-out-button'>Sign Out</div>
                </div>
        </nav>
    )
}