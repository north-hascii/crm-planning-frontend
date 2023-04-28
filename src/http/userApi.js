import {$authHost, $host} from "./index";


export const getAllUsers = async () => {
    const {data} = await $authHost.get('/admin/user/get-all')
    return data
}
// export const getUserByEmail = async (email) => {
//     const {data} = await $authHost.get('/admin/user/get-all')
//     return data
// }
