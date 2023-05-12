import app from "../App";
import {adminOptions} from "../pages/AdminPage/adminOptions";

export const NOTFOUND_ROUTE = '/not-found'
export const AUTH_ROUTE = '/auth'

export const RESET_PASSWORD_ROUTE = '/reset-password'

export const HOME_ROUTE = '/home'

export const ORDER_ROUTE = '/order'
export const CALENDAR_ROUTE = '/calendar'

export const ORDER_CALCULATION_VIEW_ROUTE = '/order/calculation/view'
export const ORDER_CALCULATION_ROUTE = '/order/calculation'

export const ORDER_VIEW_ROUTE = '/order/view'
export const ORDER_EDIT_ROUTE = '/order/edit'

export const ORDER_CREATE_ROUTE = '/order/create'

// export const ADMIN_ROUTE = '/admin'
//
// export const ADMIN_USER_ROUTE = '/admin/user'
//
// export const ADMIN_SPECIALTY_ROUTE = '/admin/specialty'
//
// export const ADMIN_OPERATION_ROUTE = '/admin/operation'
//
// export const ADMIN_MATERIAL_ROUTE = '/admin/material'

export const appRoutes = {
    admin: {
        ADMIN_ROUTE: '/admin',
        ADMIN_USER_ROUTE: '/admin/user',
        ADMIN_SPECIALTY_ROUTE: '/admin/specialty',
        ADMIN_OPERATION_ROUTE: '/admin/operation',
        ADMIN_MATERIAL_ROUTE: '/admin/material',
    }
}

export const appRoutesArray = {
    admin: [
        appRoutes.admin.ADMIN_ROUTE,
        appRoutes.admin.ADMIN_USER_ROUTE,
        appRoutes.admin.ADMIN_SPECIALTY_ROUTE,
        appRoutes.admin.ADMIN_OPERATION_ROUTE,
        appRoutes.admin.ADMIN_MATERIAL_ROUTE,
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

export const headerNavigation = {
    calendar: {
        section: pages.calendar,
        label: 'Календарь',
        route: CALENDAR_ROUTE
    },
    order: {
        section: pages.order,
        label: 'Заказы',
        route: ORDER_ROUTE
    },
    admin: {
        section: pages.admin,
        label: 'Управление',
        route: appRoutes.admin.ADMIN_ROUTE
    },
}

export const headerNavigationArray = [
    {
        section: pages.calendar,
        label: 'Календарь',
        route: CALENDAR_ROUTE
    },
    {
        section: pages.order,
        label: 'Заказы',
        route: ORDER_ROUTE
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

