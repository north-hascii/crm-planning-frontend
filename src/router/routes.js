import {AUTH_ROUTE, HOME_ROUTE, NOTFOUND_ROUTE, RESET_PASSWORD_ROUTE} from "../utils/consts";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import HomePage from "../pages/HomePage";

export const routes = [
    {
        path: NOTFOUND_ROUTE,
        Component: <NotFoundPage/>
    },
    {
        path: AUTH_ROUTE,
        Component: <AuthPage/>
    },
    {
        path: RESET_PASSWORD_ROUTE,
        Component: <ResetPasswordPage/>
    },
    {
        path: HOME_ROUTE,
        Component: <HomePage/>
    },
]