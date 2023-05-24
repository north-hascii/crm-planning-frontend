import React, {useContext} from 'react';
import './CalendarPage.scss'
import Calendar from "./Calendar";
import {getAllMaterials} from "../../http/materialApi";
import {
    getAllOrderTasksInInterval,
    getAllTasksInInterval,
    getAllWorkerByIdTasksInInterval,
    getAllWorkerTasksInInterval
} from "../../http/calendarApi";
import CalendarTaskWindow from "./CalendarTaskWindow";
import {formatDateTime} from '../../utils/util'
import {buttonProps} from "../../components/Button/ButtonProps";
import {ORDER_CREATE_ROUTE, userRoles} from "../../utils/consts";
import Button from "../../components/Button/Button";
import SearchField from "../../components/searchField/searchField";
import {searchFieldProps} from "../../components/searchField/searchFieldProps";
import {StoreContext} from "../../index";

// const tasks = [
//     {
//         "id": 5,
//         "task_name": "Обработать дерево 1 1",
//         "stage": 1,
//         "description": "some task description...",
//         "operation_id": 1,
//         "operation": {
//             "id": 0,
//             "operation_name": "",
//             "duration": 0,
//             "resource_id_list": null,
//             "resource_list": null,
//             "specialty_id_list": null,
//             "specialty_list": null
//         },
//         "count": 1,
//         "status": "start",
//         "executor_id": 0,
//         "executor": {
//             "id": 0,
//             "email": "worker2@gmail.com",
//             "password": "",
//             "first_name": "",
//             "second_name": "Петров",
//             "third_name": "",
//             "user_role": "",
//             "status": "",
//             "specialties": null
//         },
//         "start_date": "2023-05-03T13:30:45.678Z",
//         "end_date": "2023-05-03T14:30:45.678Z",
//         "product_id": 0
//     },
//     {
//         "id": 5,
//         "task_name": "Обработать дерево 1",
//         "stage": 1,
//         "description": "some task description...",
//         "operation_id": 1,
//         "operation": {
//             "id": 0,
//             "operation_name": "",
//             "duration": 0,
//             "resource_id_list": null,
//             "resource_list": null,
//             "specialty_id_list": null,
//             "specialty_list": null
//         },
//         "count": 1,
//         "status": "start",
//         "executor_id": 0,
//         "executor": {
//             "id": 0,
//             "email": "worker1@gmail.com",
//             "password": "",
//             "first_name": "",
//             "second_name": "Петров",
//             "third_name": "",
//             "user_role": "",
//             "status": "",
//             "specialties": null
//         },
//         "start_date": "2023-05-03T12:30:45.678Z",
//         "end_date": "2023-05-03T13:30:45.678Z",
//         "product_id": 0
//     },
//     {
//         "id": 5,
//         "task_name": "Обработать дерево 1 1",
//         "stage": 1,
//         "description": "some task description...",
//         "operation_id": 1,
//         "operation": {
//             "id": 0,
//             "operation_name": "",
//             "duration": 0,
//             "resource_id_list": null,
//             "resource_list": null,
//             "specialty_id_list": null,
//             "specialty_list": null
//         },
//         "count": 1,
//         "status": "start",
//         "executor_id": 0,
//         "executor": {
//             "id": 0,
//             "email": "worker3@gmail.com",
//             "password": "",
//             "first_name": "",
//             "second_name": "Петров",
//             "third_name": "",
//             "user_role": "",
//             "status": "",
//             "specialties": null
//         },
//         "start_date": "2023-05-04T14:30:45.678Z",
//         "end_date": "2023-05-04T15:30:45.678Z",
//         "product_id": 0
//     },
//     {
//         "id": 5,
//         "task_name": "Обработать дерево 1 1",
//         "stage": 1,
//         "description": "some task description...",
//         "operation_id": 1,
//         "operation": {
//             "id": 0,
//             "operation_name": "",
//             "duration": 0,
//             "resource_id_list": null,
//             "resource_list": null,
//             "specialty_id_list": null,
//             "specialty_list": null
//         },
//         "count": 1,
//         "status": "start",
//         "executor_id": 0,
//         "executor": {
//             "id": 0,
//             "email": "worker4@gmail.com",
//             "password": "",
//             "first_name": "",
//             "second_name": "Петров",
//             "third_name": "",
//             "user_role": "",
//             "status": "",
//             "specialties": null
//         },
//         "start_date": "2023-05-04T14:30:45.678Z",
//         "end_date": "2023-05-04T14:40:45.678Z",
//         "product_id": 0
//     },
// ]

function CalendarPage(props) {
    const {user} = useContext(StoreContext)
    const [dateState, setDateState] = React.useState(null)
    const [isWidgetVisible, setIsWidgetVisible] = React.useState(false)
    const [weekDaysState, setWeekDaysState] = React.useState([])

    const [weekDayAndTasksState, setWeekDayAndTasksState] = React.useState([])
    const [workers, setWorkers] = React.useState([]) // contains 1 object
    const [orders, setOrders] = React.useState([]) // contains 1 object
    const [selectedWorkerId, setSelectedWorkerId] = React.useState(-1)
    const [selectedOrderId, setSelectedOrderId] = React.useState(-1)
    const handleDateChanged = (date) => {
        setDateState(date)
        let weekDays = getWeekBeginAndEnd(date)
        // parseTasks(tasks)
        setWeekDaysState(weekDays)
        console.log(weekDays)
        // getAllTasksInInterval(weekDays[0], weekDays[weekDays.length - 1]).then(data => {
        //     console.log('calendar got', data)
        //     if (data) {
        //         parseTasks(data)
        //     } else {
        let weekDayAndTasks = [[], [], [], [], [], [], []]
        setWeekDayAndTasksState(weekDayAndTasks)
        //         // set
        //     }
        //
        // }).catch(err => {
        //     console.log("Error while getting data", err)
        // })
    }

    const getWeekBeginAndEnd = (date) => {
        const dayOfWeek = date.getDay()
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
        const startOfWeek = new Date(date.setDate(diff))
        console.log('week start date:', startOfWeek)

        let weekDays = [startOfWeek]
        for (let i = 1; i < 7; i++) {
            const date = new Date(startOfWeek)
            date.setDate(date.getDate() + i)
            weekDays.push(date)
        }
        return weekDays
    }

    const parseTasks = (tasks) => {
        let weekDayAndTasks = [[], [], [], [], [], [], []]
        for (let i = 0; i < tasks.length; i++) {
            const startDate = new Date(tasks[i].start_date)
            let parsedTask = {
                task_name: tasks[i].task_name,
                start_date: new Date(tasks[i].start_date),
                end_date: new Date(tasks[i].end_date),
                executor: tasks[i].executor,
                description: tasks[i].description,
                operation: tasks[i].operation,
                // executor_name: tasks[i].executor.second_name + ' (' + tasks[i].executor.email + ')',
            }
            weekDayAndTasks[startDate.getDay() - 1].push(parsedTask)
        }
        // console.log('weekDayAndTask:', weekDayAndTasks)
        for (let i = 0; i < 7; i++) {
            weekDayAndTasks[i].sort((a, b) => {
                if (a.start_date.getTime() === b.start_date.getTime()) {
                    // console.log('equal', a, b)
                    return a.end_date - b.end_date
                }
                return a.start_date - b.start_date
            })
        }
        setWeekDayAndTasksState(weekDayAndTasks)
        // console.log(weekDayAndTasks)
    }

    const formatDate = (date) => {
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const weekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        let weekDay = date.getDay() - 1  >= 0 ? weekDayNames[date.getDay() - 1] : weekDayNames[weekDayNames.length - 1]

        return `${weekDay}, ${day} ${month} ${year}`
    }


    React.useEffect(() => {
        // parseTasks(tasks)
    }, [])

    const [isTaskWindowVisible, setIsTaskWindowVisible] = React.useState(false)
    const [selectedTask, setSelectedTask] = React.useState(null)

    // TODO: Фронт не проверяет сооветствуют ли 7 дней выбранной неделе!!!
    return (<div className={'admin-page'}>
        {/*{!isPageLoading &&*/}
        {/*    <>*/}
        {/*        <SectionBar type={'admin'} sections={adminOptionsArray} selectedSection={selectedSection}*/}
        {/*                    onPress={(section) => {*/}
        {/*                        setSelectedSection(section)*/}
        {/*                        navigate(ADMIN_ROUTE + '/' + section)*/}
        {/*                    }}/>*/}
        {/*    </>*/}
        {/*}*/}
        <div className={'admin-page-container calendar'}>
            {/*{!isPageLoading &&*/}
            {/*    <>*/}
            <div className={'page-title-container'}>
                <div className={'page-title'}>
                    Каледнарь
                </div>
            </div>
            {/*    </>*/}
            {/*}*/}
            {/*{isTableLoading &&*/}
            {/*    <div>*/}
            {/*        Loading...*/}
            {/*    </div>*/}
            {/*}*/}
            {/*{!isTableLoading &&*/}
            {/*    <AdminTable tableType={selectedSection} tableItems={tableItems}/>*/}
            {/*}*/}
            <div className={'calendar-container'}>
                <div className={'timetable-container'}>
                    {weekDaysState.map((weekDay, index) => {
                        return (<div className={'timetable-day-container'} key={index}>
                            <div className={'timetable-day-label'}>
                                {console.log(weekDay, weekDay.getDay())}
                                {formatDate(weekDay)}
                            </div>
                            {weekDayAndTasksState[index] && weekDayAndTasksState[index].map((task, index) => {
                                return (<div className={'timetable-item'} key={index}
                                             onClick={() => {
                                                 setSelectedTask(task)
                                                 setIsTaskWindowVisible(true)
                                                 // setTimeout(() => {
                                                 //
                                                 // }, 5000)


                                             }
                                             }>
                                    <div className={'timetable-item-left'}>
                                        <div className={'timetable-item-start_time'}>
                                            {formatDateTime(task.start_date)}
                                        </div>
                                        <div className={'timetable-item-end_time'}>
                                            {formatDateTime(task.end_date)}
                                        </div>
                                    </div>
                                    <div className={'timetable-item-right'}>
                                        <div className={'timetable-item-point'}>
                                            <svg className={'task-name-icon'}
                                                 width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M11.9999 9.99984C11.7347 9.99984 11.4803 10.1052 11.2928 10.2927C11.1052 10.4803 10.9999 10.7346 10.9999 10.9998V12.9998C10.9999 13.2651 11.1052 13.5194 11.2928 13.7069C11.4803 13.8945 11.7347 13.9998 11.9999 13.9998C12.2651 13.9998 12.5195 13.8945 12.707 13.7069C12.8945 13.5194 12.9999 13.2651 12.9999 12.9998V10.9998C12.9999 10.7346 12.8945 10.4803 12.707 10.2927C12.5195 10.1052 12.2651 9.99984 11.9999 9.99984ZM20.4599 9.67984C20.3273 8.21445 19.8166 6.80857 18.9777 5.59975C18.1388 4.39092 17.0005 3.42056 15.6742 2.78358C14.3478 2.14661 12.8788 1.86485 11.4109 1.96586C9.94303 2.06687 8.52649 2.54719 7.29988 3.35984C6.24908 4.06248 5.36693 4.98914 4.71682 6.07323C4.06672 7.15732 3.66478 8.37194 3.53988 9.62984C3.41736 10.8795 3.57455 12.1408 4.00005 13.3221C4.42555 14.5035 5.10868 15.5753 5.99988 16.4598L11.2999 21.7698C11.3928 21.8636 11.5034 21.938 11.6253 21.9887C11.7472 22.0395 11.8779 22.0656 12.0099 22.0656C12.1419 22.0656 12.2726 22.0395 12.3945 21.9887C12.5163 21.938 12.6269 21.8636 12.7199 21.7698L17.9999 16.4598C18.8911 15.5753 19.5742 14.5035 19.9997 13.3221C20.4252 12.1408 20.5824 10.8795 20.4599 9.62984V9.67984ZM16.5999 15.0498L11.9999 19.6498L7.39988 15.0498C6.72197 14.3719 6.20268 13.5522 5.87935 12.6496C5.55601 11.747 5.43667 10.784 5.52988 9.82984C5.6237 8.86094 5.93164 7.925 6.43145 7.08968C6.93126 6.25436 7.61044 5.54054 8.41988 4.99984C9.48083 4.29507 10.7262 3.91913 11.9999 3.91913C13.2736 3.91913 14.5189 4.29507 15.5799 4.99984C16.3869 5.53846 17.0646 6.24912 17.5642 7.08078C18.0639 7.91243 18.3732 8.84444 18.4699 9.80984C18.5661 10.7673 18.4483 11.7341 18.1249 12.6404C17.8014 13.5467 17.2805 14.3697 16.5999 15.0498V15.0498ZM12.9199 7.56984C12.8999 7.50841 12.8695 7.45089 12.8299 7.39984L12.7099 7.24984C12.5905 7.13648 12.445 7.05435 12.2862 7.01074C12.1275 6.96713 11.9604 6.96338 11.7999 6.99984H11.6199L11.4399 7.08984L11.2899 7.21984L11.1699 7.36984C11.1303 7.42089 11.0999 7.4784 11.0799 7.53984C11.0494 7.59938 11.0292 7.6636 11.0199 7.72984C11.0033 7.81883 10.9966 7.90938 10.9999 7.99984C10.9964 8.13424 11.0238 8.26766 11.0799 8.38984C11.1308 8.50786 11.2019 8.61614 11.2899 8.70984C11.3851 8.80328 11.497 8.87792 11.6199 8.92984C11.8647 9.02284 12.1351 9.02284 12.3799 8.92984C12.5014 8.87548 12.613 8.80112 12.7099 8.70984C12.7979 8.61614 12.8689 8.50786 12.9199 8.38984C12.9724 8.26651 12.9996 8.13389 12.9999 7.99984C13.0048 7.9366 13.0048 7.87308 12.9999 7.80984C12.9906 7.72506 12.9633 7.64324 12.9199 7.56984V7.56984Z"
                                                    fill="#4C4C4C" fillOpacity="0.5"/>
                                            </svg>
                                            {task.task_name}
                                        </div>
                                        {user.userRole !== userRoles.worker &&
                                            <>
                                                <div className={'timetable-item-point'}>
                                                    <svg className={'task-executor-icon'}
                                                         width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.71 12.7099C16.6904 11.9385 17.406 10.8808 17.7572 9.68382C18.1085 8.48684 18.0779 7.21015 17.6698 6.03135C17.2617 4.85255 16.4963 3.83027 15.4801 3.10674C14.4639 2.3832 13.2474 1.99438 12 1.99438C10.7525 1.99438 9.53611 2.3832 8.51993 3.10674C7.50374 3.83027 6.73834 4.85255 6.33021 6.03135C5.92208 7.21015 5.89151 8.48684 6.24276 9.68382C6.59401 10.8808 7.3096 11.9385 8.29 12.7099C6.61007 13.3829 5.14428 14.4992 4.04889 15.9398C2.95349 17.3804 2.26956 19.0912 2.07 20.8899C2.05555 21.0212 2.06711 21.1541 2.10402 21.2809C2.14093 21.4078 2.20246 21.5261 2.28511 21.6292C2.45202 21.8374 2.69478 21.9707 2.96 21.9999C3.22521 22.0291 3.49116 21.9517 3.69932 21.7848C3.90749 21.6179 4.04082 21.3751 4.07 21.1099C4.28958 19.1551 5.22168 17.3497 6.68822 16.0387C8.15475 14.7277 10.0529 14.0029 12.02 14.0029C13.9871 14.0029 15.8852 14.7277 17.3518 16.0387C18.8183 17.3497 19.7504 19.1551 19.97 21.1099C19.9972 21.3556 20.1144 21.5825 20.2991 21.7469C20.4838 21.9113 20.7228 22.0014 20.97 21.9999H21.08C21.3421 21.9697 21.5817 21.8372 21.7466 21.6311C21.9114 21.4251 21.9881 21.1622 21.96 20.8999C21.7595 19.0961 21.0719 17.3809 19.9708 15.9381C18.8698 14.4953 17.3969 13.3794 15.71 12.7099V12.7099ZM12 11.9999C11.2089 11.9999 10.4355 11.7653 9.77772 11.3258C9.11992 10.8862 8.60723 10.2615 8.30448 9.53061C8.00173 8.79971 7.92251 7.99544 8.07686 7.21952C8.2312 6.4436 8.61216 5.73086 9.17157 5.17145C9.73098 4.61204 10.4437 4.23108 11.2196 4.07674C11.9956 3.9224 12.7998 4.00161 13.5307 4.30436C14.2616 4.60711 14.8863 5.1198 15.3259 5.7776C15.7654 6.4354 16 7.20876 16 7.99988C16 9.06075 15.5786 10.0782 14.8284 10.8283C14.0783 11.5785 13.0609 11.9999 12 11.9999Z"
                                                            fill="#4C4C4C" fillOpacity="0.5"/>
                                                    </svg>

                                                    {task.executor.second_name + ' ' +
                                                        task.executor.first_name + ' ' + task.executor.third_name}
                                                </div>
                                                <div className={'timetable-item-point'}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12 2C10.466 1.99993 8.95266 2.35274 7.57691 3.03113C6.20116 3.70952 4.99992 4.69531 4.0661 5.91222C3.13229 7.12914 2.49094 8.54457 2.19168 10.049C1.89241 11.5535 1.94325 13.1066 2.34026 14.5882C2.73727 16.0699 3.46982 17.4403 4.48121 18.5936C5.49261 19.7468 6.75576 20.6519 8.17293 21.2389C9.5901 21.8259 11.1233 22.0789 12.6539 21.9786C14.1846 21.8782 15.6716 21.427 17 20.66C17.1195 20.5975 17.2251 20.5114 17.3105 20.407C17.3959 20.3027 17.4592 20.1821 17.4968 20.0525C17.5344 19.923 17.5454 19.7872 17.5291 19.6533C17.5129 19.5194 17.4697 19.3902 17.4022 19.2735C17.3347 19.1567 17.2443 19.0548 17.1364 18.9739C17.0285 18.893 16.9053 18.8347 16.7743 18.8026C16.6433 18.7705 16.5072 18.7653 16.3741 18.7872C16.241 18.8091 16.1138 18.8576 16 18.93C14.4749 19.8105 12.7019 20.1632 10.956 19.9334C9.21003 19.7036 7.5887 18.9041 6.34342 17.659C5.09813 16.4138 4.29848 14.7926 4.06848 13.0467C3.83848 11.3008 4.19097 9.52774 5.0713 8.00257C5.95163 6.47741 7.31059 5.28532 8.93745 4.61119C10.5643 3.93706 12.3681 3.81855 14.0692 4.27404C15.7703 4.72953 17.2735 5.73358 18.3458 7.13046C19.4181 8.52734 19.9996 10.239 20 12V12.75C20 13.2141 19.8156 13.6592 19.4874 13.9874C19.1592 14.3156 18.7141 14.5 18.25 14.5C17.7858 14.5 17.3407 14.3156 17.0125 13.9874C16.6843 13.6592 16.5 13.2141 16.5 12.75V8.5C16.5 8.23478 16.3946 7.98043 16.2071 7.79289C16.0195 7.60536 15.7652 7.5 15.5 7.5C15.2674 7.49483 15.0403 7.57088 14.8578 7.71507C14.6753 7.85926 14.5487 8.06257 14.5 8.29C13.7649 7.78158 12.8937 7.5063 12 7.5C11.2471 7.491 10.5041 7.67102 9.83882 8.0236C9.17359 8.37617 8.60745 8.89001 8.19226 9.51807C7.77706 10.1461 7.52609 10.8683 7.46231 11.6185C7.39854 12.3687 7.524 13.1229 7.82722 13.812C8.13044 14.5011 8.60171 15.1032 9.19788 15.563C9.79405 16.0228 10.4961 16.3257 11.2396 16.4439C11.9832 16.5621 12.7445 16.4918 13.4539 16.2396C14.1632 15.9873 14.798 15.5611 15.3 15C15.7751 15.6153 16.4302 16.0673 17.1741 16.293C17.918 16.5188 18.7138 16.5071 19.4508 16.2596C20.1877 16.0121 20.8292 15.5411 21.2861 14.9121C21.743 14.2831 21.9925 13.5274 22 12.75V12C22 10.6868 21.7413 9.38642 21.2387 8.17317C20.7362 6.95991 19.9996 5.85752 19.071 4.92893C18.1424 4.00035 17.04 3.26375 15.8268 2.7612C14.6135 2.25866 13.3132 2 12 2V2ZM12 14.5C11.5055 14.5 11.0221 14.3534 10.611 14.0787C10.1999 13.804 9.87947 13.4135 9.69025 12.9567C9.50103 12.4999 9.45153 11.9972 9.54799 11.5123C9.64445 11.0273 9.88255 10.5819 10.2322 10.2322C10.5818 9.8826 11.0273 9.6445 11.5122 9.54804C11.9972 9.45157 12.4998 9.50108 12.9567 9.6903C13.4135 9.87952 13.8039 10.2 14.0786 10.6111C14.3533 11.0222 14.5 11.5055 14.5 12C14.5 12.663 14.2366 13.2989 13.7677 13.7678C13.2989 14.2366 12.663 14.5 12 14.5V14.5Z"
                                                            fill="#4C4C4C" fillOpacity="0.5"/>
                                                    </svg>

                                                    {task.executor.email}
                                                </div>
                                            </>
                                        }

                                    </div>
                                </div>)
                            })}
                        </div>)
                    })}
                </div>
                {isTaskWindowVisible &&
                    <CalendarTaskWindow isVisible={isTaskWindowVisible} onClose={() => setIsTaskWindowVisible(false)}
                                        task={selectedTask}/>

                }
                <div className={'calendar-selector-container'}>
                    <div className={'calendar-date-selector-container'}>
                        <div className={'calendar-widget-label green-border'}
                             onClick={() => setIsWidgetVisible(!isWidgetVisible)}>
                            {dateState ? dateState.toLocaleDateString() : 'Выберите неделю'}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4V4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z"
                                    fill="#4C4C4C" fillOpacity="0.5"/>
                            </svg>
                        </div>
                        {isWidgetVisible && <div className={'calendar-widget-container'}>
                            <Calendar onChange={(date) => handleDateChanged(date)}/>
                        </div>}
                    </div>
                    {user.userRole === userRoles.worker &&
                        <div className={'calendar-date-selector-worker-container'}>
                            <Button text={'Показать все задачи'}
                                    size={buttonProps.size.small}
                                    color={buttonProps.color.light}
                                    bgColor={buttonProps.background_color.dark_v1}
                                    onClck={() => {
                                        if (!weekDaysState[0] || !weekDaysState[weekDaysState.length - 1]) {
                                            alert('Выберите неделю для отображения.')
                                            return
                                        }
                                        getAllWorkerTasksInInterval(weekDaysState[0], weekDaysState[weekDaysState.length - 1]).then(data => {
                                            console.log('calendar got', data)
                                            if (data) {
                                                parseTasks(data)
                                            } else {
                                                let weekDayAndTasks = [[], [], [], [], [], [], []]
                                                setWeekDayAndTasksState(weekDayAndTasks)
                                                // set
                                            }

                                        }).catch(err => {
                                            console.log("Error while getting data", err)
                                            alert('Не удалось найти задачи.')
                                        })
                                    }}
                            />
                        </div>
                    }

                    {(user.userRole === userRoles.admin || user.userRole === userRoles.manager) &&
                        <div className={'calendar-date-selector-worker-container'}>
                            <Button text={'Показать все задачи'}
                                    size={buttonProps.size.small}
                                    color={buttonProps.color.light}
                                    bgColor={buttonProps.background_color.dark_v1}
                                    onClck={() => {
                                        if (!weekDaysState[0] || !weekDaysState[weekDaysState.length - 1]) {
                                            alert('Выберите неделю для отображения.')
                                            return
                                        }
                                        getAllTasksInInterval(weekDaysState[0], weekDaysState[weekDaysState.length - 1]).then(data => {
                                            console.log('calendar got', data)
                                            if (data) {
                                                parseTasks(data)
                                            } else {
                                                let weekDayAndTasks = [[], [], [], [], [], [], []]
                                                setWeekDayAndTasksState(weekDayAndTasks)
                                                // set
                                            }

                                        }).catch(err => {
                                            console.log("Error while getting data", err)
                                            alert('Не удалось найти задачи.')
                                        })
                                    }}
                            />
                        </div>
                    }
                    {/*<div className={'calendar-date-selector-worker-container-outer'}>*/}
                    {(user.userRole === userRoles.admin || user.userRole === userRoles.manager) &&
                        <>
                            <div className={'calendar-date-selector-worker-container'}>
                                <SearchField type={searchFieldProps.worker} baseList={workers}
                                             onUpdate={(items) => {
                                                 if (items[0]) {
                                                     setSelectedWorkerId(items[0].id)
                                                     console.log(items[0].id)
                                                 }
                                                 setWorkers(items)
                                             }
                                             } listLimit={1}/>
                                <Button text={'Показать все задачи работника'}
                                        size={buttonProps.size.small}
                                        color={buttonProps.color.light}
                                        bgColor={buttonProps.background_color.dark_v1}
                                        onClck={() => {
                                            if (!weekDaysState[0] || !weekDaysState[weekDaysState.length - 1]) {
                                                alert('Выберите неделю для отображения.')
                                                return
                                            }
                                            if (selectedWorkerId === -1) {
                                                alert('Выберите работника для отображения.')
                                                return
                                            }
                                            getAllWorkerByIdTasksInInterval(weekDaysState[0], weekDaysState[weekDaysState.length - 1], selectedWorkerId).then(data => {
                                                console.log('calendar got', data)
                                                if (data) {
                                                    parseTasks(data)
                                                } else {
                                                    let weekDayAndTasks = [[], [], [], [], [], [], []]
                                                    setWeekDayAndTasksState(weekDayAndTasks)
                                                    // set
                                                }

                                            }).catch(err => {
                                                console.log("Error while getting data", err)
                                                alert('Не удалось найти задачи.')
                                            })
                                        }}
                                />
                            </div>
                            <div className={'calendar-date-selector-worker-container'}>
                                <SearchField type={searchFieldProps.order} baseList={orders}
                                             onUpdate={(items) => {
                                                 if (items[0]) {
                                                     setSelectedOrderId(items[0].id)
                                                     console.log(items[0].id)
                                                 }
                                                 setOrders(items)
                                             }
                                             } listLimit={1}/>
                                <Button text={'Показать все задачи заказа'}
                                        size={buttonProps.size.small}
                                        color={buttonProps.color.light}
                                        bgColor={buttonProps.background_color.dark_v1}
                                        onClck={() => {
                                            if (!weekDaysState[0] || !weekDaysState[weekDaysState.length - 1]) {
                                                alert('Выберите неделю для отображения.')
                                                return
                                            }
                                            getAllOrderTasksInInterval(weekDaysState[0], weekDaysState[weekDaysState.length - 1], selectedOrderId).then(data => {
                                                console.log('calendar got', data)
                                                if (data) {
                                                    parseTasks(data)
                                                } else {
                                                    let weekDayAndTasks = [[], [], [], [], [], [], []]
                                                    setWeekDayAndTasksState(weekDayAndTasks)
                                                    // set
                                                }

                                            }).catch(err => {
                                                console.log("Error while getting data", err)
                                                alert('Не удалось найти задачи.')
                                            })
                                        }}
                                />
                            </div>
                        </>
                    }
                    {/*</div>*/}
                </div>
            </div>
        </div>
    </div>);
}

export default CalendarPage;