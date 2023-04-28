import React, {useContext} from 'react';
import '../DefaultPage.scss'
import './AuthPage.scss'
import Header from "../../components/header/header";
import AuthForm from "../../components/authForm/authForm";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, HOME_ROUTE, localStorageParams} from "../../utils/consts";
import {StoreContext} from "../../index";
import {observer} from "mobx-react-lite";

const AuthPage = observer(() => {
    const {user} = useContext(StoreContext)
    const navigate = useNavigate()
    React.useEffect(() => {
        if (user.isAuth) {
            navigate(HOME_ROUTE)
        }
    }, [user.isAuth])

    return (
        <div className={'auth-page'}>
            <AuthForm/>
        </div>
    );
})

export default AuthPage;