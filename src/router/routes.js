import {
    ADMIN_ROUTE,
    AUTH_ROUTE,
    HOME_ROUTE,
    NOTFOUND_ROUTE,
    ORDER_INFO_ROUTE,
    ORDER_EDIT_ROUTE,
    RESET_PASSWORD_ROUTE,
    ORDER_CALCULATION_INFO_ROUTE,
    ORDER_CALCULATION_EDIT_ROUTE, ADMIN_SPECIALTY_ROUTE, ADMIN_USER_ROUTE, ADMIN_MATERIAL_ROUTE
} from "../utils/consts";
import AuthPage from "../pages/AuthPage/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import ResetPasswordPage from "../pages/AuthPage/ResetPasswordPage";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminEditorPage from "../pages/AdminPage/AdminEditorPage";
import OrderInfoPage from "../pages/OrderInfoPage/OrderInfoPage";
import OrderEditPage from "../pages/OrderEditPage/OrderEditPage";
import OrderCalculationInfoPage from "../pages/OrderCalculationInfoPage/OrderCalculationInfoPage";
import OrderCalculationEditPage from "../pages/OrderCalculationEditPage/OrderCalculationEditPage";
import UserEditor from "../components/adminEditor/UserEditor";
import SpecialtyEditorPage from "../pages/AdminPage/SpecialtyEditorPage";
import MaterialEditorPage from "../pages/AdminPage/MaterialEditorPage";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: <HomePage/>
    },

    // {
    //     path: ADMIN_ROUTE + '/',
    //     Component: <AdminPage/>
    // },
    // {
    //     path: ADMIN_SPECIALTY_ROUTE,
    //     Component: <AdminPage/>
    // },
    {
        path: ADMIN_ROUTE + '/:section',
        Component: <AdminPage/>
    },
    {
        path: ADMIN_USER_ROUTE + '/:id',
        Component: <AdminEditorPage/>
    },
    {
        path: ADMIN_SPECIALTY_ROUTE + '/:id',
        Component: <SpecialtyEditorPage/>
    },
    {
        path: ADMIN_MATERIAL_ROUTE + '/:id',
        Component: <MaterialEditorPage/>
    },
    {
        path: ORDER_INFO_ROUTE + '/:id',
        Component: <OrderInfoPage/>
    },
    {
        path: ORDER_EDIT_ROUTE + '/:id',
        Component: <OrderEditPage/>
    },
    {
        path: ORDER_CALCULATION_INFO_ROUTE + '/:id',
        Component: <OrderCalculationInfoPage/>
    },
    {
        path: ORDER_CALCULATION_EDIT_ROUTE + '/:id',
        Component: <OrderCalculationEditPage/>
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