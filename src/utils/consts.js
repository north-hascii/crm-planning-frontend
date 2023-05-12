import app from "../App";
import {adminOptions} from "../pages/AdminPage/adminOptions";
// import {adminRoutes} from "../router/routes";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import UserEditorPage from "../pages/AdminPage/UserEditorPage";
import SpecialtyEditorPage from "../pages/AdminPage/SpecialtyEditorPage";
import OperationEditorPage from "../pages/AdminPage/OperationEditorPage";
import MaterialEditorPage from "../pages/AdminPage/MaterialEditorPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderCreatorPage from "../pages/OrderPage/OrderCreatorPage";
import OrderViewerPage from "../pages/OrderPage/OrderViewerPage";
import OrderEditorPage from "../pages/OrderPage/OrderEditorPage";
import OrderCalculationPage from "../pages/OrderPage/OrderCalculationPage";
import CalendarPage from "../pages/CalendarPage/CalendarPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import ResetPasswordPage from "../pages/AuthPage/ResetPasswordPage";
import NotFoundPage from "../pages/NotFoundPage";

export const NOTFOUND_ROUTE = '/not-found'
export const AUTH_ROUTE = '/auth'

export const RESET_PASSWORD_ROUTE = '/reset-password'

export const HOME_ROUTE = '/home'

export const appRoutes = {
    admin: {
        ADMIN_ROUTE: '/admin',
        ADMIN_USER_ROUTE: '/admin/user',
        ADMIN_SPECIALTY_ROUTE: '/admin/specialty',
        ADMIN_OPERATION_ROUTE: '/admin/operation',
        ADMIN_MATERIAL_ROUTE: '/admin/material',
    },
    calendar: {
        CALENDAR_ROUTE: '/calendar'
    },
    order: {
        ORDER_ROUTE: '/order',
        ORDER_CALCULATION_ROUTE: '/order/calculation',
        ORDER_VIEW_ROUTE: '/order/view',
        ORDER_EDIT_ROUTE: '/order/edit',
        ORDER_CREATE_ROUTE: '/order/create'
    }
}

export const appRoutesArray = {
    admin: [
        appRoutes.admin.ADMIN_ROUTE,
        appRoutes.admin.ADMIN_USER_ROUTE,
        appRoutes.admin.ADMIN_SPECIALTY_ROUTE,
        appRoutes.admin.ADMIN_OPERATION_ROUTE,
        appRoutes.admin.ADMIN_MATERIAL_ROUTE,
    ],
    calendar: [
        appRoutes.calendar.CALENDAR_ROUTE
    ],
    order: [
        appRoutes.order.ORDER_ROUTE,
        appRoutes.order.ORDER_CALCULATION_ROUTE,
        appRoutes.order.ORDER_VIEW_ROUTE,
        appRoutes.order.ORDER_EDIT_ROUTE,
        appRoutes.order.ORDER_CREATE_ROUTE
    ]
}

export const formTypes = {
    loginForm: 'login-form',
    resetPasswordForm: 'reset-password'
}

export const localStorageParams = {
    user_token: 'user_token',
    user_role: 'user_role',
    user_email: 'email',
    user_second_name: 'second_name',
    user_id: 'user_id'
}

export const userRoles = {
    admin: 'admin',
    manager: 'manager',
    worker: 'worker',
    user: 'user',
}

export const userRolesArray = [
    userRoles.admin,
    userRoles.manager,
    userRoles.worker,
    userRoles.user,
]

export const userStatuses = {
    working: 'working',
    trip: 'on business trip',
    vocation: 'on vocation',
    fired: 'fired',
}


export const pageMods = {
    viewer: 'viewer',
    editor: 'editor',
    creator: 'creator'
}

export const pages = {
    admin: 'admin',
    calendar: 'calendar',
    order: 'order',
}

export const headerNavigationOnRole = {
    admin: [
        {
            section: pages.calendar,
            label: 'Календарь',
            route: appRoutes.calendar.CALENDAR_ROUTE
        },
        {
            section: pages.order,
            label: 'Заказы',
            route: appRoutes.order.ORDER_ROUTE
        },
        {
            section: pages.admin,
            label: 'Управление',
            route: appRoutes.admin.ADMIN_ROUTE
        },
    ],
    manager: [
        {
            section: pages.calendar,
            label: 'Календарь',
            route: appRoutes.calendar.CALENDAR_ROUTE
        },
        {
            section: pages.order,
            label: 'Заказы',
            route: appRoutes.order.ORDER_ROUTE
        },
        {
            section: pages.admin,
            label: 'Управление',
            route: appRoutes.admin.ADMIN_ROUTE
        },
    ],
    worker: [
        {
            section: pages.calendar,
            label: 'Календарь',
            route: appRoutes.calendar.CALENDAR_ROUTE
        },
    ],
    user: [

    ]
    // calendar: {
    //     section: pages.calendar,
    //     label: 'Календарь',
    //     route: appRoutes.calendar.CALENDAR_ROUTE
    // },
    // order: {
    //     section: pages.order,
    //     label: 'Заказы',
    //     route: appRoutes.order.ORDER_ROUTE
    // },
    // admin: {
    //     section: pages.admin,
    //     label: 'Управление',
    //     route: appRoutes.admin.ADMIN_ROUTE
    // },
}

export const headerNavigationArray = [
    {
        section: pages.calendar,
        label: 'Календарь',
        route: appRoutes.calendar.CALENDAR_ROUTE
    },
    {
        section: pages.order,
        label: 'Заказы',
        route: appRoutes.order.ORDER_ROUTE
    },
    {
        section: pages.admin,
        label: 'Управление',
        route: appRoutes.admin.ADMIN_ROUTE
    },
]

export const adminSections = {
    user: {
        section: adminOptions.user,
        label: 'Пользователи',
        title: 'Список пользователей',
    },
    specialty: {
        section: adminOptions.specialty,
        label: 'Специальности',
        title: 'Список специальностей',
    },
    operation: {
        section: adminOptions.operation,
        label: 'Операции',
        title: 'Список операций',
    },
    material: {
        section: adminOptions.material,
        label: 'Материалы',
        title: 'Список материалов',
    }
}

export const adminSectionsArray = [
    {
        section: adminOptions.user,
        label: 'Пользователи',
        title: 'Список пользователей',
    },
    {
        section: adminOptions.specialty,
        label: 'Специальности',
        title: 'Список специальностей',
    },
    {
        section: adminOptions.operation,
        label: 'Операции',
        title: 'Список операций',
    },
    {
        section: adminOptions.material,
        label: 'Материалы',
        title: 'Список материалов',
    }
]

export const authRoutes = [
    {
        path: '/home',
        Component: <HomePage/>
    },
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

export const adminRoutes = [
    {
        path: appRoutes.admin.ADMIN_ROUTE + '/:section',
        Component: <AdminPage/>
    },
    {
        path: appRoutes.admin.ADMIN_ROUTE + '/user' + '/create',
        Component: <UserEditorPage mod={pageMods.creator}/>
    },
    {
        path: appRoutes.admin.ADMIN_USER_ROUTE + '/:id',
        Component: <UserEditorPage mod={pageMods.editor}/>
    },
    {
        path: appRoutes.admin.ADMIN_SPECIALTY_ROUTE + '/:id',
        Component: <SpecialtyEditorPage mod={pageMods.editor}/>
    },
    {
        path: appRoutes.admin.ADMIN_ROUTE + '/specialty' + '/create',
        Component: <SpecialtyEditorPage mod={pageMods.creator}/>
    },
    {
        path: appRoutes.admin.ADMIN_OPERATION_ROUTE + '/:id',
        Component: <OperationEditorPage mod={pageMods.editor}/>
    },
    {
        path: appRoutes.admin.ADMIN_ROUTE + '/operation' + '/create',
        Component: <OperationEditorPage mod={pageMods.creator}/>
    },
    {
        path: appRoutes.admin.ADMIN_MATERIAL_ROUTE + '/:id',
        Component: <MaterialEditorPage mod={pageMods.editor}/>
    },
    {
        path: appRoutes.admin.ADMIN_ROUTE + '/material' + '/create',
        Component: <MaterialEditorPage mod={pageMods.creator}/>
    },
    {
        path: appRoutes.order.ORDER_ROUTE,
        Component: <OrderPage/>
    },
    {
        path: appRoutes.order.ORDER_CREATE_ROUTE,
        Component: <OrderCreatorPage/>
    },
    {
        path: appRoutes.order.ORDER_VIEW_ROUTE + '/:id',
        Component: <OrderViewerPage/>
    },
    {
        path: appRoutes.order.ORDER_EDIT_ROUTE + '/:id',
        Component: <OrderEditorPage/>
    },
    {
        path: appRoutes.order.ORDER_CALCULATION_ROUTE,
        Component: <OrderCalculationPage/>
    },
    {
        path: appRoutes.calendar.CALENDAR_ROUTE,
        Component: <CalendarPage/>
    }
]

export const managerRoutes = [
    {
        path: appRoutes.admin.ADMIN_ROUTE + '/:section',
        Component: <AdminPage/>
    },
    {
        path: appRoutes.admin.ADMIN_ROUTE + '/user' + '/create',
        Component: <UserEditorPage mod={pageMods.creator}/>
    },
    {
        path: appRoutes.admin.ADMIN_USER_ROUTE + '/:id',
        Component: <UserEditorPage mod={pageMods.editor}/>
    },
    {
        path: appRoutes.admin.ADMIN_SPECIALTY_ROUTE + '/:id',
        Component: <SpecialtyEditorPage mod={pageMods.editor}/>
    },
    {
        path: appRoutes.admin.ADMIN_ROUTE + '/specialty' + '/create',
        Component: <SpecialtyEditorPage mod={pageMods.creator}/>
    },
    {
        path: appRoutes.admin.ADMIN_OPERATION_ROUTE + '/:id',
        Component: <OperationEditorPage mod={pageMods.editor}/>
    },
    {
        path: appRoutes.admin.ADMIN_ROUTE + '/operation' + '/create',
        Component: <OperationEditorPage mod={pageMods.creator}/>
    },
    {
        path: appRoutes.admin.ADMIN_MATERIAL_ROUTE + '/:id',
        Component: <MaterialEditorPage mod={pageMods.editor}/>
    },
    {
        path: appRoutes.admin.ADMIN_ROUTE + '/material' + '/create',
        Component: <MaterialEditorPage mod={pageMods.creator}/>
    },
    {
        path: appRoutes.order.ORDER_ROUTE,
        Component: <OrderPage/>
    },
    {
        path: appRoutes.order.ORDER_CREATE_ROUTE,
        Component: <OrderCreatorPage/>
    },
    {
        path: appRoutes.order.ORDER_VIEW_ROUTE + '/:id',
        Component: <OrderViewerPage/>
    },
    {
        path: appRoutes.order.ORDER_EDIT_ROUTE + '/:id',
        Component: <OrderEditorPage/>
    },
    {
        path: appRoutes.order.ORDER_CALCULATION_ROUTE,
        Component: <OrderCalculationPage/>
    },
    {
        path: appRoutes.calendar.CALENDAR_ROUTE,
        Component: <CalendarPage/>
    }
]

export const workerRoutes = [
    {
        path: appRoutes.calendar.CALENDAR_ROUTE,
        Component: <CalendarPage/>
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

