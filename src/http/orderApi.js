import {$authHost, $host} from "./index";


export const getAllOrders = async () => {
    const {data} = await $authHost.get('/manual/order/get-all')
    return data
}

export const getOrderById = async (id) => {
    const {data} = await $authHost.get('/manual/order/get-by-id?id=' + id)
    return data
}

