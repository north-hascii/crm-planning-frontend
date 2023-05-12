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

export const ADMIN_ROUTE = '/admin'

export const ADMIN_USER_ROUTE = '/admin/user'

export const ADMIN_SPECIALTY_ROUTE = '/admin/specialty'

export const ADMIN_USER_EDITOR = '/admin/user'

export const ADMIN_OPERATION_ROUTE = '/admin/operation'

export const ADMIN_MATERIAL_ROUTE = '/admin/material'

// export const ADMIN_

// export const


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
