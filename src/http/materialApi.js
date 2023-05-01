import {$authHost} from "./index";

export const getAllMaterials = async () => {
    const {data} = await $authHost.get('/manual/material/get-all')
    return data
}