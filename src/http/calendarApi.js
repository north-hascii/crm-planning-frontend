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
