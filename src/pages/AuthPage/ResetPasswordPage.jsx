import React from 'react';
import './AuthPage.scss'
import AuthForm from "../../components/AuthForm/AuthForm";
import {formTypes} from "../../utils/consts";

function ResetPasswordPage(props) {
    return (
        <div className={'reset-password-page'}>
            <AuthForm formType={formTypes.resetPasswordForm}/>
        </div>
    );
}

export default ResetPasswordPage;