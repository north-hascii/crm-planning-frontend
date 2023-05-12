import {$authHost, $host} from "./index";


export const getAllUsers = async () => {
    const {data} = await $authHost.get('/admin/user/get-all')
    return data
}

export const getAllUsersByPartSecondName = async (secondName) => {
    const {data} = await $authHost.get('/admin/user/get-all-by-part-name?second_name=' + secondName)
    return data
}

export const getAllWorkersByPartSecondName = async (secondName) => {
    const {data} = await $authHost.get('/admin/user/get-all-workers-by-part-name?second_name=' + secondName)
    return data
}


export const getUserById = async (id) => {
    const {data} = await $authHost.get('/admin/user/get-by-id?id=' + id)
    return data
}

export const updateUser = async (id, email, first_name, second_name, third_name, role, status, specsIds) => {
    const {response} = await $authHost.put('/admin/user/update', {
            "id": id,
            "email": email,
            "first_name": first_name,
            "second_name": second_name,
            "third_name": third_name,
            "user_role": role,
            "status": status,
            "specialty_id_list": specsIds
        }
    )
}

export const createUser = async (email, password, first_name, second_name, third_name, role, status, specsIds) => {
    const {response} = await $authHost.post('/admin/user/create', {
            "email": email,
            "password": password,
            "first_name": first_name,
            "second_name": second_name,
            "third_name": third_name,
            "user_role": role,
            "status": status,
            "specialty_id_list": specsIds
        }
    )
}

export const deleteUserById = async (id) => {
    const {data} = await $authHost.delete('/admin/user/delete?id=' + id)
    return data
}

