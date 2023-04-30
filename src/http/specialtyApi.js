import {$authHost, $host} from "./index";


export const getAllSpecialties = async () => {
    const {data} = await $authHost.get('/manual/specialty/get-all')
    return data
}

export const getSpecialtiesByPartName = async (name) => {
    const {data} = await $authHost.get('manual/specialty/get-by-part-name?specialty_name=' + name)
    return data
}