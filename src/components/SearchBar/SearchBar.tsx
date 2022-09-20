import React from 'react';
import { SearchField } from '../SearchField/SearchField';
import sortIcon from '../../assets/down-caret-icon.png';
import editIcon from '../../assets/edit-pencil-icon.png';
import deleteIcon from '../../assets/trash-can-icon.png';
import './SearchBar.css';

interface SearchBarProps {
    onClickDelete: React.MouseEventHandler<HTMLButtonElement>,
    onClickEdit: React.MouseEventHandler<HTMLButtonElement>,
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchBar({ onClickDelete, onClickEdit, onSearchChange }: SearchBarProps) {
    return (
        <div className='SearchBar-search-bar'>
            <SearchField onSearchChange={onSearchChange} />
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