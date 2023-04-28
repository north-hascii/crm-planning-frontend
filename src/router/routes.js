import {
    ADMIN_ROUTE,
    ADMIN_USER_EDITOR,
    AUTH_ROUTE,
    HOME_ROUTE,
    NOTFOUND_ROUTE,
    RESET_PASSWORD_ROUTE
} from "../utils/consts";
import AuthPage from "../pages/AuthPage/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import ResetPasswordPage from "../pages/AuthPage/ResetPasswordPage";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminEditorPage from "../pages/AdminPage/AdminEditorPage";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: <HomePage/>
    },
    {
        path: ADMIN_ROUTE,
        Component: <AdminPage/>
    },
    {
        path: ADMIN_USER_EDITOR + '/:id',
        Component: <AdminEditorPage/>
    }
]

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: <AuthPage/>
    },
    {
        path: RESET_PASSWORD_ROUTE,
        Component: <ResetPasswordPage/>
    },
    // {
    //     path: HOME_ROUTE,
    //     Component: <HomePage/>
    // },
    {
        path: NOTFOUND_ROUTE,
        Component: <NotFoundPage/>
    },
]