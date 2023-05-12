import {$authHost, $host} from "./index";


export const getAllOrders = async () => {
    const {data} = await $authHost.get('/manual/order/get-all')
    return data
}

export const getOrderById = async (id) => {
    const {data} = await $authHost.get('/manual/order/get-by-id?id=' + id)
    return data
}

export const getOrderEndDateById = async (id) => {
    const {data} = await $authHost.get('/manual/order/get-time?id=' + id)
    return data
}


export const getAllOrdersByPartName = async (orderName) => {
    const {data} = await $authHost.get('/manual/order/get-all-by-part-name?order_name=' + orderName)
    return data
}

export const createOrder = async (order) => {
    console.log('before POST', order)
    const {response} = await $authHost.post('/manual/order/create', order
    )
}

export const updateOrder = async (order) => {
    console.log('before POST', order)
    const {response} = await $authHost.put('/manual/order/update-contact', order
    )
}
