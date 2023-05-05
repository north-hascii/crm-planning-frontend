import {$authHost} from "./index";

export const getAllSOperations = async () => {
    const {data} = await $authHost.get('/manual/operation/get-all')
    return data
}

export const getOperationById = async (id) => {
    const {data} = await $authHost.get('manual/operation/get-by-id?id=' + id)
    return data
}

export const updateOperation = async (id, operation_name, duration, resource_list, specialty_id_list) => {
    const {response} = await $authHost.put('/manual/operation/update', {
            "id": id,
            "operation_name": operation_name,
            "duration": parseInt(duration),
            "resource_list": resource_list,
            "specialty_id_list": specialty_id_list,
        }
    )
}