import React from 'react';
import './OptionsBar.scss'

function OptionsBar({type = 'default', options = [], markTab = (name) => {}}) {
    const [selectedTab, setSelectedTab] = React.useState(options[0].type)

    return (
        <div className={`options-bar ${type}`}>
            <div className={'options-bar-container'}>
                {options.map((item, index) => {
                    return (<div className={`options-bar-item ${item.type === selectedTab ? 'selected' : ''}`}
                                 onClick={() => {
                                     setSelectedTab(item.type)
                                     markTab(item.type)
                                 }}
                                 key={index}>
                        {item.text}
                    </div>)
                })}
            </div>
        </div>
    );
}

export default OptionsBar;