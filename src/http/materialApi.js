import {$authHost} from "./index";

export const getAllMaterials = async () => {
    const {data} = await $authHost.get('/manual/material/get-all')
    return data
}

export const getAllMaterialsByPartName = async (name) => {
    const {data} = await $authHost.get('manual/material/get-all-by-part-name?material_name=' + name)
    return data
}
