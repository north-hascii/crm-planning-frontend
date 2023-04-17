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
        localStorage.setItem(localStorageParams.user_role, data.user_role)
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