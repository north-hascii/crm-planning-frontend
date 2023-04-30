import {$authHost, $host} from "./index";


export const getAllUsers = async () => {
    const {data} = await $authHost.get('/admin/user/get-all')
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

