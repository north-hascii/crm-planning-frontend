import React, {useContext} from 'react';
import './header.scss'
import {
    ADMIN_ROUTE, ADMIN_USER_ROUTE, adminSections, appRoutes, appRoutesArray,
    AUTH_ROUTE, CALENDAR_ROUTE, headerNavigationArray,
    HOME_ROUTE,
    localStorageParams,
    ORDER_INFO_ROUTE,
    ORDER_ROUTE, pages,
    userRoles
} from "../../utils/consts";
import {useLocation, useNavigate} from "react-router-dom";
import {observer} from 'mobx-react-lite'
import mobx, {autorun} from "mobx";
import {StoreContext} from "../../index";
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import SubLine from "../SubLine/SubLine";
import {getUserById} from "../../http/userApi";

const Header = observer(() => {
    const {user} = useContext(StoreContext)
    // const [user]
    const [isLoading, setIsLoading] = React.useState(true)

    const logOut = () => {
        localStorage.clear()
        user.clearCache()
        // clear()
    }


    // const tabNamesAndTexts = [
    //     {
    //         name: 'calendar',
    //         text: 'Календарь',
    //     },
    //     {
    //         name: 'order',
    //         text: 'Заказы',
    //     },
    //     {
    //         name: 'admin',
    //         text: 'Админ панель',
    //     }
    // ]
    //
    // const tabsAndRoutes = {
    //     'calendar': CALENDAR_ROUTE,
    //     'order': ORDER_ROUTE,
    //     'admin': ADMIN_ROUTE,
    // }

    const [selectedTab, setSelectedTab] = React.useState('')
    const navigate = useNavigate()

    React.useEffect(() => {
        // if (selectedTab) {
        //     navigate(tabsAndRoutes[selectedTab])
        // }
    }, [selectedTab])
    const location = useLocation()
    React.useEffect(() => {
        console.log('location=', location.pathname)

        if (appRoutesArray.admin.includes(location.pathname)) {
            setSelectedTab(headerNavigationArray.find((item, index) => {
                return item.section === pages.admin
            }).section)

            if (location.pathname === appRoutes.admin.ADMIN_SPECIALTY_ROUTE) {
                navigate(appRoutes.admin.ADMIN_ROUTE + '/' + adminSections.specialty.section)
            }

        }

    }, [location.pathname])

    const selectHeaderSection = (section, route) => {
        setSelectedTab(section)
        navigate(route)
    }




    // console.log(location.pathname)

    const [isUserProfileVisible, setIsUserProfileVisible] = React.useState(false)


    return (<header>
        {!user.isAuth && <div className={`header-container auth`}>
            <div className={'header-logo'} onClick={() => {
                setSelectedTab('')
                navigate(AUTH_ROUTE)
            }
            }>
                LOGO
            </div>
        </div>
        }
        {user.isAuth && <div className={'header-container'}>
            <div className={'header-logo'} onClick={() => {
                setSelectedTab('')
                navigate(HOME_ROUTE)
            }
            }>
                LOGO
            </div>
            <div className={'header-container-items'}>
                {headerNavigationArray.map((item, index) => {
                    return (<div
                        className={`header-container-item ${item.section === selectedTab ? 'selected' : ''}`}
                        onClick={() => selectHeaderSection(item.section, item.route)} key={index}>
                        {item.label}
                    </div>)
                })}
            </div>
            <div className={'header-user-profile-label-container'}>
                <div className={'header-user-profile-label'}
                     onClick={() => setIsUserProfileVisible(!isUserProfileVisible)}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="19" height="19" rx="9.5" fill="#6B9EA4"/>
                        <path
                            d="M12.1279 11.0032C12.8223 10.4569 13.3292 9.70763 13.578 8.85977C13.8268 8.01191 13.8051 7.10758 13.516 6.2726C13.2269 5.43762 12.6848 4.71351 11.965 4.201C11.2452 3.6885 10.3835 3.41309 9.49994 3.41309C8.61633 3.41309 7.75468 3.6885 7.03489 4.201C6.31509 4.71351 5.77293 5.43762 5.48384 6.2726C5.19474 7.10758 5.17309 8.01191 5.42189 8.85977C5.67069 9.70763 6.17758 10.4569 6.87202 11.0032C5.68208 11.48 4.64381 12.2707 3.8679 13.2911C3.092 14.3115 2.60754 15.5233 2.46619 16.7974C2.45595 16.8904 2.46414 16.9845 2.49029 17.0744C2.51643 17.1642 2.56002 17.2481 2.61856 17.3211C2.73678 17.4685 2.90874 17.563 3.0966 17.5836C3.28447 17.6043 3.47284 17.5495 3.62029 17.4313C3.76774 17.313 3.86219 17.1411 3.88285 16.9532C4.03839 15.5686 4.69863 14.2898 5.73743 13.3611C6.77622 12.4325 8.12074 11.9191 9.5141 11.9191C10.9075 11.9191 12.252 12.4325 13.2908 13.3611C14.3296 14.2898 14.9898 15.5686 15.1454 16.9532C15.1646 17.1273 15.2477 17.288 15.3785 17.4044C15.5093 17.5209 15.6786 17.5847 15.8537 17.5836H15.9316C16.1173 17.5623 16.287 17.4684 16.4038 17.3224C16.5205 17.1765 16.5749 16.9903 16.5549 16.8045C16.4129 15.5268 15.9258 14.3118 15.146 13.2899C14.3661 12.2679 13.3228 11.4774 12.1279 11.0032ZM9.49994 10.5003C8.93956 10.5003 8.39176 10.3341 7.92582 10.0228C7.45988 9.71148 7.09673 9.26897 6.88228 8.75125C6.66783 8.23352 6.61172 7.66384 6.72105 7.11422C6.83037 6.56461 7.10022 6.05976 7.49647 5.66351C7.89272 5.26726 8.39757 4.99741 8.94718 4.88809C9.49679 4.77876 10.0665 4.83487 10.5842 5.04932C11.1019 5.26377 11.5444 5.62692 11.8558 6.09286C12.1671 6.5588 12.3333 7.1066 12.3333 7.66698C12.3333 8.41843 12.0348 9.1391 11.5034 9.67045C10.9721 10.2018 10.2514 10.5003 9.49994 10.5003Z"
                            fill="white"/>
                    </svg>

                    Профиль
                </div>
                <div className={`header-user-profile-window ${isUserProfileVisible ? 'visible' : 'hidden'}`}>
                    <div className={'header-user-profile-window-name'}>
                        User: {user.userSecondName}
                    </div>
                    <SubLine/>
                    <div className={'header-user-profile-window-item-container'}>
                        <div className={'header-user-profile-window-item'}>
                            Почта: {user.userEmail}
                        </div>
                        <div className={'header-user-profile-window-item'}>
                            Уровень доступа: {user.userRole}
                        </div>
                    </div>
                    <Button text={'Выйти'} size={buttonProps.size.small}
                            color={buttonProps.color.light}
                            bgColor={buttonProps.background_color.dark_v1}
                            onClck={logOut}/>
                </div>
            </div>
        </div>}
    </header>);
})

export default Header;