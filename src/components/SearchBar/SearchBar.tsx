import searchIcon from '../../assets/search-icon.png';
import sortIcon from '../../assets/down-caret-icon.png';
import editIcon from '../../assets/edit-pencil-icon.png';
import deleteIcon from '../../assets/trash-can-icon.png';
import React from 'react';
import './SearchBar.css';

export function SearchBar({ onClickDelete, onClickEdit }: { onClickDelete: React.MouseEventHandler<HTMLButtonElement>, onClickEdit: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <div className='SearchBar-search-bar'>
            <div className='SearchBar-search-input-container'>
                <img className='SearchBar-search-icon' src={searchIcon} alt='search' />
                <input className='SearchBar-search-input' type='text' placeholder='Search' />
            </div>
            <div className='SearchBar-buttons-container'>
                <button
                    className='SearchBar-button'
                    onClick={onClickEdit}
                >
                    <img className='SearchBar-button-image' src={editIcon} alt='edit' />
                </button>
                <button
                    className='SearchBar-button'
                    onClick={onClickDelete}
                >
                    <img className='SearchBar-button-image' src={deleteIcon} alt='delete' />
                </button>
                <div className='SearchBar-sort-container'>
                    <div className='SearchBar-sort-text-wrapper'>
                        <div>Sort by:</div>
                        <div>Name</div>
                    </div>
                    <img className='SearchBar-sort-icon' src={sortIcon} alt='sort' />
                </div>
            </div>
        </div>
    )
}