import React from 'react';
import './AuthPage.scss'
import Header from "../../components/header/header";
import AuthForm from "../../components/authForm/authForm";
import {formTypes} from "../../utils/consts";

function ResetPasswordPage(props) {
    return (
        <div className={'reset-password-page'}>
            <AuthForm formType={formTypes.resetPasswordForm}/>
        </div>
    );
}

export default ResetPasswordPage;