import React from 'react';
import './CalendarPage.scss'
import Calendar from "./Calendar";

const tasks = [
    {
        "id": 5,
        "task_name": "Обработать дерево 1 1",
        "stage": 1,
        "description": "some task description...",
        "operation_id": 1,
        "operation": {
            "id": 0,
            "operation_name": "",
            "duration": 0,
            "resource_id_list": null,
            "resource_list": null,
            "specialty_id_list": null,
            "specialty_list": null
        },
        "count": 1,
        "status": "start",
        "executor_id": 0,
        "executor": {
            "id": 0,
            "email": "worker2@gmail.com",
            "password": "",
            "first_name": "",
            "second_name": "Петров",
            "third_name": "",
            "user_role": "",
            "status": "",
            "specialties": null
        },
        "start_date": "2023-05-03T13:30:45.678Z",
        "end_date": "2023-05-03T14:30:45.678Z",
        "product_id": 0
    },
    {
        "id": 5,
        "task_name": "Обработать дерево 1",
        "stage": 1,
        "description": "some task description...",
        "operation_id": 1,
        "operation": {
            "id": 0,
            "operation_name": "",
            "duration": 0,
            "resource_id_list": null,
            "resource_list": null,
            "specialty_id_list": null,
            "specialty_list": null
        },
        "count": 1,
        "status": "start",
        "executor_id": 0,
        "executor": {
            "id": 0,
            "email": "worker1@gmail.com",
            "password": "",
            "first_name": "",
            "second_name": "Петров",
            "third_name": "",
            "user_role": "",
            "status": "",
            "specialties": null
        },
        "start_date": "2023-05-03T12:30:45.678Z",
        "end_date": "2023-05-03T13:30:45.678Z",
        "product_id": 0
    },
    {
        "id": 5,
        "task_name": "Обработать дерево 1 1",
        "stage": 1,
        "description": "some task description...",
        "operation_id": 1,
        "operation": {
            "id": 0,
            "operation_name": "",
            "duration": 0,
            "resource_id_list": null,
            "resource_list": null,
            "specialty_id_list": null,
            "specialty_list": null
        },
        "count": 1,
        "status": "start",
        "executor_id": 0,
        "executor": {
            "id": 0,
            "email": "worker3@gmail.com",
            "password": "",
            "first_name": "",
            "second_name": "Петров",
            "third_name": "",
            "user_role": "",
            "status": "",
            "specialties": null
        },
        "start_date": "2023-05-04T14:30:45.678Z",
        "end_date": "2023-05-04T15:30:45.678Z",
        "product_id": 0
    },
    {
        "id": 5,
        "task_name": "Обработать дерево 1 1",
        "stage": 1,
        "description": "some task description...",
        "operation_id": 1,
        "operation": {
            "id": 0,
            "operation_name": "",
            "duration": 0,
            "resource_id_list": null,
            "resource_list": null,
            "specialty_id_list": null,
            "specialty_list": null
        },
        "count": 1,
        "status": "start",
        "executor_id": 0,
        "executor": {
            "id": 0,
            "email": "worker4@gmail.com",
            "password": "",
            "first_name": "",
            "second_name": "Петров",
            "third_name": "",
            "user_role": "",
            "status": "",
            "specialties": null
        },
        "start_date": "2023-05-04T14:30:45.678Z",
        "end_date": "2023-05-04T14:40:45.678Z",
        "product_id": 0
    },
]

function CalendarPage(props) {
    const [dateState, setDateState] = React.useState(null)
    const [isWidgetVisible, setIsWidgetVisigle] = React.useState(false)
    const [weekDaysState, setWeekDaysState] = React.useState([])

    const [weekDayAndTasksState, setWeekDayAndTasksState] = React.useState([])

    const handleDateChanged = (date) => {
        setDateState(date)
        let weekDays = getWeekBeginAndEnd(date)
        parseTasks(tasks)
        setWeekDaysState(weekDays)

    }

    const getWeekBeginAndEnd = (date) => {
        const dayOfWeek = date.getDay()
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
        const startOfWeek = new Date(date.setDate(diff))
        console.log(startOfWeek)

        let weekDays = [startOfWeek]
        for (let i = 1; i < 7; i++) {
            const date = new Date(startOfWeek)
            date.setDate(date.getDate() + i)
            weekDays.push(date)
        }
        return weekDays
    }

    const parseTasks = (tasks) => {
        let weekDayAndTasks = [
            [], [], [], [], [], [], []
        ]
        for (let i = 0; i < tasks.length; i++) {
            const startDate = new Date(tasks[i].start_date)
            let parsedTask = {
                task_name: tasks[i].task_name,
                start_date: new Date(tasks[i].start_date),
                end_date: new Date(tasks[i].end_date),
                executor_name: tasks[i].executor.second_name + ' (' + tasks[i].executor.email + ')',
            }
            weekDayAndTasks[startDate.getDay()].push(parsedTask)
        }
        for (let i = 0; i < 7; i++) {
            weekDayAndTasks[i].sort((a, b) => {
                if (a.start_date.getTime() === b.start_date.getTime()) {
                    console.log('equal', a, b)
                    return a.end_date - b.end_date
                }
                return a.start_date - b.start_date
            })
        }
        setWeekDayAndTasksState(weekDayAndTasks)
        // console.log(weekDayAndTasks)
    }
    const formatDate = (date) => {
        const months = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря'
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`
    }

    const formatDateTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }


    React.useEffect(() => {
        // parseTasks(tasks)
    }, [])

    return (
        <div className={'admin-page'}>
            {/*{!isPageLoading &&*/}
            {/*    <>*/}
            {/*        <SectionBar type={'admin'} sections={adminOptionsArray} selectedSection={selectedSection}*/}
            {/*                    onPress={(section) => {*/}
            {/*                        setSelectedSection(section)*/}
            {/*                        navigate(ADMIN_ROUTE + '/' + section)*/}
            {/*                    }}/>*/}
            {/*    </>*/}
            {/*}*/}
            <div className={'admin-page-container'}>
                {/*{!isPageLoading &&*/}
                {/*    <>*/}
                <div className={'page-title'}>
                    Каледнарь
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
                <div className={'calendar-date-selector-container'}>
                    <div className={'calendar-widget-label green-border'}
                         onClick={() => setIsWidgetVisigle(!isWidgetVisible)}>
                        {dateState ? dateState.toLocaleDateString()
                            :
                            'Выберите неделю'
                        }
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4V4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z"
                                fill="#4C4C4C" fillOpacity="0.5"/>
                        </svg>
                    </div>
                    {isWidgetVisible &&
                        <div className={'calendar-widget-container'}>
                            <Calendar onChange={(date) => handleDateChanged(date)}/>
                        </div>
                    }
                </div>

                {/*<div className={'timetable-container'}>*/}
                {/*    <table>*/}
                {/*        <thead>*/}
                {/*        <tr>*/}
                {/*            <th>*/}
                {/*                Время*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Понедельник*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Вторник*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Среда*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Четверг*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Пятница*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Суббота*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Воскресенье*/}
                {/*            </th>*/}
                {/*        </tr>*/}
                {/*        </thead>*/}
                {/*        <tbody>*/}
                {/*        <tr>*/}
                {/*            <th>*/}
                {/*                9:00-10:00*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 1*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 2*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 3*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 4*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 5*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 6*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 7*/}
                {/*            </th>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <th>*/}
                {/*                9:00-10:00*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 1*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 2*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 3*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 4*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 5*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 6*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*                Задание 7*/}
                {/*            </th>*/}
                {/*        </tr>*/}
                {/*        </tbody>*/}
                {/*    </table>*/}
                {/*</div>*/}
                <div className={'timetable-container'}>
                    {weekDaysState.map((weekDay, index) => {
                        return (<div className={'timetable-day-container'} key={index}>
                            <div className={'timetable-day-label'}>
                                {formatDate(weekDay)}
                            </div>
                            {weekDayAndTasksState[index] && weekDayAndTasksState[index].map((task, index) => {
                                return (<div className={'timetable-item'} key={index}>
                                    <div className={'timetable-item-left'}>
                                        <div className={'timetable-item-start_time'}>
                                            {formatDateTime(task.start_date)}
                                        </div>
                                        <div className={'timetable-item-end_time'}>
                                            {formatDateTime(task.end_date)}
                                        </div>
                                    </div>
                                    <div className={'timetable-item-right'}>
                                        <div className={'timetable-item-name'}>
                                            {task.task_name}
                                        </div>
                                        <div className={'timetable-item-name'}>
                                            Исполнитель: {task.executor_name}
                                        </div>
                                    </div>
                                </div>)
                            })}
                            {/*<div className={'timetable-item'}>*/}
                            {/*    Задание 2*/}
                            {/*</div>*/}
                            {/*<div className={'timetable-item'}>*/}
                            {/*    Задание 3*/}
                            {/*</div>*/}
                        </div>)
                    })}
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;