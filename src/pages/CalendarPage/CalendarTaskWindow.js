import React from 'react';
import './CalendarTaskWindow.scss'
import {formatDateTime} from '../../utils/util'

function CalendarTaskWindow({isVisible = false, onClose = Function.prototype, task = null}) {
    React.useEffect(() => {
        console.log('task:', task)

    }, [])
    return (
        <div className={`calendar-task-window ${isVisible ? 'visible' : 'hidden'}`}>
            <svg className="close-calendar-task-window"
                 onClick={onClose}
                 width="15" height="15" viewBox="0 0 15 15" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8.38097 7.49963L12.3185 3.56838C12.4362 3.45069 12.5023 3.29107 12.5023 3.12463C12.5023 2.95819 12.4362 2.79857 12.3185 2.68088C12.2008 2.56319 12.0412 2.49707 11.8747 2.49707C11.7083 2.49707 11.5487 2.56319 11.431 2.68088L7.49972 6.61838L3.56847 2.68088C3.45078 2.56319 3.29116 2.49707 3.12472 2.49707C2.95828 2.49707 2.79866 2.56319 2.68097 2.68088C2.56328 2.79857 2.49716 2.95819 2.49716 3.12463C2.49716 3.29107 2.56328 3.45069 2.68097 3.56838L6.61847 7.49963L2.68097 11.4309C2.62239 11.489 2.57589 11.5581 2.54416 11.6343C2.51243 11.7104 2.49609 11.7921 2.49609 11.8746C2.49609 11.9571 2.51243 12.0388 2.54416 12.115C2.57589 12.1912 2.62239 12.2603 2.68097 12.3184C2.73907 12.377 2.8082 12.4235 2.88436 12.4552C2.96052 12.4869 3.04221 12.5033 3.12472 12.5033C3.20723 12.5033 3.28892 12.4869 3.36508 12.4552C3.44124 12.4235 3.51037 12.377 3.56847 12.3184L7.49972 8.38088L11.431 12.3184C11.4891 12.377 11.5582 12.4235 11.6344 12.4552C11.7105 12.4869 11.7922 12.5033 11.8747 12.5033C11.9572 12.5033 12.0389 12.4869 12.1151 12.4552C12.1912 12.4235 12.2604 12.377 12.3185 12.3184C12.377 12.2603 12.4235 12.1912 12.4553 12.115C12.487 12.0388 12.5033 11.9571 12.5033 11.8746C12.5033 11.7921 12.487 11.7104 12.4553 11.6343C12.4235 11.5581 12.377 11.489 12.3185 11.4309L8.38097 7.49963Z"
                    fill="#4C4C4C"></path>
            </svg>
            <div className={'calendar-task-window-title'}>
                Информация о задаче
            </div>
            <div className={'calendar-task-window-content'}>
                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Название задачи:
                    </div>
                    <div className={'viewer-item-input'}>
                        {task.task_name}
                    </div>
                </div>

                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        ФИО исполнителя:
                    </div>
                    <div className={'viewer-item-input'}>
                        {task.executor.second_name + ' ' +
                            task.executor.first_name + ' ' + task.executor.third_name + ' (' +
                            task.executor.email + ')'}
                    </div>
                </div>
                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Интервал:
                    </div>
                    <div className={'viewer-item-input'}>
                        {formatDateTime(task.start_date)} - {formatDateTime(task.end_date)}
                    </div>
                </div>
                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Описание:
                    </div>
                    <div className={'viewer-item-input'}>
                        {task.description}
                    </div>
                </div>
                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Ресурсы:
                    </div>
                    <div className={'viewer-item-input'}>
                        {task.operation.resource_list && task.operation.resource_list.map((resource, index) => {
                            return (
                                <>
                                    <div key={index}>
                                        {`${resource.material.material_name} ${resource.amount} (${resource.material.units});`}

                                    </div>
                                    <br/>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalendarTaskWindow;