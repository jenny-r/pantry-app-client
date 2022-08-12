import { useState } from 'react';
import './Tabs.css';

export function Tabs({ tabNames, onTabSelect }: { tabNames: Array<string>, onTabSelect: Function }) {

    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index: number) => {
        setToggleState(index);
        onTabSelect(index);
    }

    return (
        <div className='Tabs-tabs-container'>
            <div className='Tabs-edge' />
            <div className='Tabs-tabs-wrapper'>
                {tabNames.map((tabName, i) =>
                    <div
                        key={i}
                        className={toggleState === i ? 'Tabs-tabs Tabs-active-tab' : 'Tabs-tabs'}
                        onClick={() => toggleTab(i)}
                    >
                        {tabName}
                    </div>
                )}
            </div>
            <div className='Tabs-edge' />
        </div>
    )
}