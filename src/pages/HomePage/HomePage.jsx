import React, {useContext} from 'react';
import './HomePage.scss'
import {useNavigate} from "react-router-dom";
import {StoreContext} from "../../index";
import {headerNavigationOnRole, userRolesArray} from "../../utils/consts";


function HomePage(props) {
    const {user} = useContext(StoreContext)
    const navigate = useNavigate()

    return (
        <div className={'admin-page'}>
            <div className={'admin-page-container'}>
                <div className={'page-title-container'}>
                    <div className={'page-title'}>
                        Компания "Орензнакъ"
                    </div>
                </div>
                <div className={'home-page-items'}>
                    {userRolesArray.includes(user.userRole) && user.userRole in headerNavigationOnRole && headerNavigationOnRole[user.userRole].map((item, index) => {
                        return (
                            <div className={'home-page-item'} onClick={() => navigate(item?.route)}>
                                <div className={'home-page-item-label'}>
                                    {item.label}
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    );
}

export default HomePage;