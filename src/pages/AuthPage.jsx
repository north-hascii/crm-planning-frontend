import React from 'react';
import './DefaultPage.scss'
import Header from "../components/header/header";
import AuthForm from "../components/authForm/authForm";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, localStorageParams} from "../utils/consts";

function AuthPage(props) {
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!localStorage.getItem(localStorageParams.user_token)) {
            navigate(AUTH_ROUTE)
        }
    }, [])
    return (
        <div className={'auth-page'}>
            <Header/>
            <AuthForm/>
        </div>
    );
}

export default AuthPage;