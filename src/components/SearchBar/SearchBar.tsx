import searchIcon from '../../assets/search-icon.png';
import sortIcon from '../../assets/down-caret-icon.png';
import editIcon from '../../assets/edit-pencil-icon.png';
import deleteIcon from '../../assets/trash-can-icon.png';

import './SearchBar.css';

export function SearchBar() {
    return (
        <div className='SearchBar-search-bar'>
            <div className='SearchBar-search-input-container'>
                <img className='SearchBar-search-icon' src={searchIcon} alt='search' />
                <input className='SearchBar-search-input' type='text' placeholder='Search' />
            </div>

            <button className='SearchBar-button'>
                <img src={editIcon} alt='edit' />
            </button>
            <button className='SearchBar-button'>
                <img src={deleteIcon} alt='delete' />
            </button>
            <div className='SearchBar-sort-container'>
                <div className='SearchBar-sort-text-wrapper'>
                    <div>Sort by:</div>
                    <div>Name</div>
                </div>
                <img className='SearchBar-sort-icon' src={sortIcon} alt='sort' />
            </div>
        </div>
    )
}