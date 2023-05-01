import {$authHost} from "./index";

export const getAllSOperations = async () => {
    const {data} = await $authHost.get('/manual/operation/get-all')
    return data
}