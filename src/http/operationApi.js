import {$authHost} from "./index";

export const getAllSOperations = async () => {
    const {data} = await $authHost.get('/manual/operation/get-all')
    return data
}

export const getOperationById = async (id) => {
    const {data} = await $authHost.get('manual/operation/get-by-id?id=' + id)
    return data
}
