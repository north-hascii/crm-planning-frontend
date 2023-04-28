import {$authHost, $host} from "./index";


export const getAllSpecialties = async () => {
    const {data} = await $authHost.get('/manual/specialty/get-all')
    return data
}