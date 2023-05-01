import {$authHost, $host} from "./index";


export const getAllSpecialties = async () => {
    const {data} = await $authHost.get('/manual/specialty/get-all')
    return data
}

export const getSpecialtiesByPartName = async (name) => {
    const {data} = await $authHost.get('manual/specialty/get-by-part-name?specialty_name=' + name)
    return data
}

export const getSpecialtiesById = async (id) => {
    const {data} = await $authHost.get('manual/specialty/get-id?id=' + id)
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