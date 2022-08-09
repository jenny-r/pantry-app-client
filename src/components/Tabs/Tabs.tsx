import React, { useState } from 'react';
import './Tabs.css';

export function Tabs({ tabNames, onTabSelect }: { tabNames: Array<string>, onTabSelect: Function }) {

    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index: number) => {
        setToggleState(index);
        onTabSelect(index);
    }

    return (
        <div className='tabs-wrapper'>
            <div className='edge'></div>
            {tabNames.map((tabName, i) =>
                <div
                    key={i}
                    className={toggleState === i ? 'tabs active-tab' : 'tabs'}
                    onClick={() => toggleTab(i)}
                >
                    {tabName}
                </div>
            )}
            <div className='edge'></div>
        </div>
    )
}