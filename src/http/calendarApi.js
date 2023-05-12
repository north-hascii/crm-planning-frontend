import {$authHost} from "./index";

export const getAllTasksInInterval = async (beginDate, endDate) => {
    const {data} = await $authHost.get('/manual/calendar/get-all', {
            params: {
                    "start_date": beginDate,
                    "end_date": endDate,
                },
        })

    return data
}

export const getAllWorkerTasksInInterval = async (beginDate, endDate, workerId) => {
    const {data} = await $authHost.get('/manual/calendar/get-all-by-worker-id', {
        params: {
            "start_date": beginDate,
            "end_date": endDate,
            "id": workerId,
        },
    })

    return data
}

export const getAllOrderTasksInInterval = async (beginDate, endDate, workerId) => {
    const {data} = await $authHost.get('/manual/calendar/get-all-by-order-id', {
        params: {
            "start_date": beginDate,
            "end_date": endDate,
            "id": workerId,
        },
    })

    return data
}

