import searchIcon from '../../assets/search-icon.png';
import './SearchField.css';

interface SearchFieldProps {
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchField({ onSearchChange }: SearchFieldProps) {

    return (
        <div className='SearchField-search-container'>
            <img className='SearchField-search-icon' src={searchIcon} alt='search' />
            <input className='SearchField-search-input' type='search' placeholder='Search' onChange={onSearchChange} />
        </div>
    )
}