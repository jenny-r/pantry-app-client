import React from 'react';
import { Sort } from '../Sort/Sort';
import { SearchField } from '../SearchField/SearchField';
import editIcon from '../../assets/edit-pencil-icon.png';
import deleteIcon from '../../assets/trash-can-icon.png';
import './SearchBar.css';

interface SearchBarProps {
    sortOptionNames: string[],
    onClickDelete: React.MouseEventHandler<HTMLButtonElement>,
    onClickEdit: React.MouseEventHandler<HTMLButtonElement>,
    onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchBar({ sortOptionNames, onClickDelete, onClickEdit, onSortChange, onSearchChange }: SearchBarProps) {
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
                <Sort
                    sortOptionNames={sortOptionNames}
                    onSortChange={onSortChange}
                />
            </div>
        </div>
    )
}