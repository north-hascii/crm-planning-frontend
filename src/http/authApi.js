import {$authHost, $host} from "./index";
import {HTTP_STATUS_CODES} from "./HttpStatus";
import {localStorageParams} from "../utils/consts";

// export const signUp = async (email, password) => {
//     const {data} = await $host.post('auth/sign-up', {
//         "email": email, "password": password
//     })
//     localStorage.setItem('token', data.token)
//     return jwt_decode(data.token)
// }
export const signIn = async (email, password) => {
    try {
        const {data} = await $host.post('auth/sign-in', {
            "email": email, "password": password
        })
        localStorage.setItem(localStorageParams.user_token, data.user_token)
        localStorage.setItem(localStorageParams.user_role, data.user.user_role)
        localStorage.setItem(localStorageParams.user_email, data.user.email)
        localStorage.setItem(localStorageParams.user_second_name, data.user.second_name)
        localStorage.setItem(localStorageParams.user_first_name, data.user.first_name)
        localStorage.setItem(localStorageParams.user_third_name, data.user.third_name)
        localStorage.setItem(localStorageParams.user_id, data.user.id)
    } catch (err) {
        if (err.response) {
            return err.response.status
        } else {
            return HTTP_STATUS_CODES.NETWORK_ERR
        }
    }

    return HTTP_STATUS_CODES.STATUS_OK
}

export const resetPassword = async (email) => {
    try {
        const {data} = await $host.post('auth/reset-password', {
            "email": email
        })
    } catch (err) {
        if (err.response) {
            return err.response.status
        } else {
            return HTTP_STATUS_CODES.NETWORK_ERR
        }
    }

    return HTTP_STATUS_CODES.STATUS_OK
}