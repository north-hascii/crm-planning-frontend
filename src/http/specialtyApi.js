import {$authHost, $host} from "./index";


export const getAllSpecialties = async () => {
    const {data} = await $authHost.get('/manual/specialty/get-all')
    return data
}

export const getSpecialtiesByPartName = async (name) => {
    const {data} = await $authHost.get('manual/specialty/get-all-by-part-name?specialty_name=' + name)
    return data
}

export const getSpecialtyById = async (id) => {
    const {data} = await $authHost.get('manual/specialty/get-by-id?id=' + id)
    return data
}

export const updateSpecialty = async (id, specialty_name, specialty_user_id_list) => {
    const {response} = await $authHost.put('/manual/specialty/update', {
            "id": id,
            "specialty_name": specialty_name,
            "specialty_user_id_list": specialty_user_id_list,
        }
    )
}

export const createSpecialty = async (specialty_name, specialty_user_id_list) => {
    const {response} = await $authHost.post('/manual/specialty/create', {
        "specialty_name": specialty_name,
        "specialty_user_id_list": specialty_user_id_list,
        }
    )
}

export const deleteSpecialtyById = async (id) => {
    const {data} = await $authHost.delete('/manual/specialty/delete?id=' + id)
    return data
}