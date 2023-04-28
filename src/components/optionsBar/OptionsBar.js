import React from 'react';
import './OptionsBar.scss'

function OptionsBar({type = 'default', options = [], markTab = (name) => {}}) {
    const [selectedTab, setSelectedTab] = React.useState(options[0].name)

    return (
        <div className={`options-bar ${type}`}>
            {options.map((item, index) => {
                return (<div className={`options-bar-item ${item.name === selectedTab ? 'selected' : ''}`}
                             onClick={() => {
                                 setSelectedTab(item.name)
                                 markTab(item.name)
                             }}
                             key={index}>
                    {item.text}
                </div>)
            })}
        </div>
    );
}

export default OptionsBar;