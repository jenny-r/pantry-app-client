import React from 'react';
import './Navigation.css';

export function Navigation () {
    return (
        <nav className='Navigation-navbar'>
                <h1 className='Navigation-app-name'>My Pantry</h1>
                <div className='Navigation-sign-out-button'>Sign Out</div>
        </nav>
    )
}