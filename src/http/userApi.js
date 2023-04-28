import {$authHost, $host} from "./index";


export const getAllUsers = async () => {
    const {data} = await $authHost.get('/admin/user/get-all')
    return data
}

export const getUserById = async (id) => {
    const {data} = await $authHost.get('/admin/user/get-by-id?id=' + id)
    return data
}

