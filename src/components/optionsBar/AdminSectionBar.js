import React from 'react';
import './SectionBar.scss'
import {useLocation} from "react-router-dom";
import {adminSections, appRoutes} from "../../utils/consts";

function AdminSectionBar(
    {
        type = 'default',
        sections = [],
        selectedSection = null,
        onPress = (sectionName) => {

        }
    }) {

    const location = useLocation()

    const [activeSection, setActiveSection] = React.useState(
        selectedSection ? selectedSection : sections[0]
    )

    React.useEffect(() => {
        if (location.pathname === appRoutes.admin.ADMIN_USER_ROUTE) {
            setActiveSection(adminSections.user.section)
        }
        if (location.pathname === appRoutes.admin.ADMIN_SPECIALTY_ROUTE) {
            setActiveSection(adminSections.specialty.section)
        }
        if (location.pathname === appRoutes.admin.ADMIN_OPERATION_ROUTE) {
            setActiveSection(adminSections.operation.section)
        }
        if (location.pathname === appRoutes.admin.ADMIN_MATERIAL_ROUTE) {
            setActiveSection(adminSections.material.section)
        }
    }, [location.pathname])

    return (
        <div className={`section-bar ${type}`}>
            <div className={'section-bar-container'}>
                {sections.map((item, index) => {
                    return (<div className={`section-bar-item ${item.section === activeSection ? 'selected' : ''}`}
                                 onClick={() => {
                                     setActiveSection(item.section)
                                     onPress(item.section)
                                 }}
                                 key={index}>
                        {item.label}
                    </div>)
                })}
            </div>
        </div>
    );
}

export default AdminSectionBar;