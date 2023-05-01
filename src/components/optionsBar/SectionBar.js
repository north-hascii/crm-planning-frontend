import React from 'react';
import './SectionBar.scss'

function SectionBar(
    {
        type = 'default',
        sections = [],
        selectedSection = null,
        onPress = (sectionName) => {

        }
    }) {

    const [activeSection, setActiveSection] = React.useState(
        selectedSection ? selectedSection : sections[0].type
    )

    return (
        <div className={`section-bar ${type}`}>
            <div className={'section-bar-container'}>
                {sections.map((item, index) => {
                    return (<div className={`section-bar-item ${item.type === activeSection ? 'selected' : ''}`}
                                 onClick={() => {
                                     setActiveSection(item.type)
                                     onPress(item.type)
                                 }}
                                 key={index}>
                        {item.text}
                    </div>)
                })}
            </div>
        </div>
    );
}

export default SectionBar;