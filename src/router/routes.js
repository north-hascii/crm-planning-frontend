import {
    ADMIN_ROUTE,
    AUTH_ROUTE,
    HOME_ROUTE,
    NOTFOUND_ROUTE,
    ORDER_EDIT_ROUTE,
    RESET_PASSWORD_ROUTE,
    ORDER_CALCULATION_EDIT_ROUTE,
    ADMIN_SPECIALTY_ROUTE,
    ADMIN_USER_ROUTE,
    ADMIN_MATERIAL_ROUTE,
    ORDER_ROUTE,
    ORDER_VIEW_ROUTE, ORDER_CREATE_ROUTE, ORDER_CALCULATION_ROUTE, CALENDAR_ROUTE, ADMIN_OPERATION_ROUTE
} from "../utils/consts";
import AuthPage from "../pages/AuthPage/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import ResetPasswordPage from "../pages/AuthPage/ResetPasswordPage";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminEditorPage from "../pages/AdminPage/AdminEditorPage";
import SpecialtyEditorPage from "../pages/AdminPage/SpecialtyEditorPage";
import MaterialEditorPage from "../pages/AdminPage/MaterialEditorPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderItemPage from "../pages/OrderPage/OrderItemPage";
import OrderCalculationPage from "../pages/OrderPage/OrderCalculationPage";
import OrderViewerPage from "../pages/OrderPage/OrderViewerPage";
import OrderEditorPage from "../pages/OrderPage/OrderEditorPage";
import OrderCreatorPage from "../pages/OrderPage/OrderCreatorPage";
import CalendarPage from "../pages/CalendarPage/CalendarPage";
import OperationEditorPage from "../pages/AdminPage/OperationEditorPage";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: <HomePage/>
    },
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
      path: ADMIN_OPERATION_ROUTE + '/:id',
      Component: <OperationEditorPage/>
    },
    {
        path: ADMIN_MATERIAL_ROUTE + '/:id',
        Component: <MaterialEditorPage/>
    },
    {
        path: ORDER_ROUTE,
        Component: <OrderPage/>
    },
    {
        path: ORDER_CREATE_ROUTE,
        Component: <OrderCreatorPage/>
    },
    {
        path: ORDER_VIEW_ROUTE + '/:id',
        Component: <OrderViewerPage/>
    },
    {
        path: ORDER_EDIT_ROUTE + '/:id',
        Component: <OrderEditorPage/>
    },
    {
        path: ORDER_CALCULATION_ROUTE,
        Component: <OrderCalculationPage/>
    },
    {
        path: CALENDAR_ROUTE,
        Component: <CalendarPage/>
    }
    // {
    //     path: ORDER_INFO_ROUTE + '/:id',
    //     Component: <OrderInfoPage/>
    // },
    // {
    //     path: ORDER_EDIT_ROUTE + '/:id',
    //     Component: <OrderEditPage/>
    // },
    // {
    //     path: ORDER_CALCULATION_INFO_ROUTE + '/:id',
    //     Component: <OrderCalculationInfoPage/>
    // },
    // {
    //     path: ORDER_CALCULATION_EDIT_ROUTE + '/:id',
    //     Component: <OrderCalculationEditPage/>
    // }
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