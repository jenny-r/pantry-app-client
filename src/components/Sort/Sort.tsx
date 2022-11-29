import './Sort.css';

interface SortProps {
    sortOptionNames: string[]
    onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Sort({ sortOptionNames, onSortChange }: SortProps) {

    return (
        <div className='Sort-container'>
            <div className='Sort-label'>Sort By:</div>
            <select className='Sort-select' onChange={onSortChange}>
                {sortOptionNames.map((optionName, i) =>
                    <option
                        key={i}
                        value={i}
                    >
                        {optionName}
                    </option>
                )}
            </select>
        </div>
    )
}