import {$authHost} from "./index";

export const getAllMaterials = async () => {
    const {data} = await $authHost.get('/manual/material/get-all')
    return data
}

export const getAllMaterialsByPartName = async (name) => {
    const {data} = await $authHost.get('manual/material/get-all-by-part-name?material_name=' + name)
    return data
}

export const getMaterialById = async (id) => {
    const {data} = await $authHost.get('manual/material/get-by-id?id=' + id)
    return data
}


export const updateMaterial = async (id, material_name, units) => {
    const {response} = await $authHost.put('/manual/material/update', {
            "id": id,
            "material_name": material_name,
            "units": units
        }
    )
}

export const createMaterial = async (material_name, units) => {
    const {response} = await $authHost.post('/manual/material/create', {
        "material_name": material_name,
        "units": units
        }
    )
}

export const deleteMaterialById = async (id) => {
    const {data} = await $authHost.delete('/manual/material/delete?id=' + id)
    return data
}

