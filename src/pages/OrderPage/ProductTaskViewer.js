import React from 'react';
import {getSpecialtiesByPartName} from "../../http/specialtyApi";
import SearchField from "../../components/searchField/searchField";
import {searchFieldProps} from "../../components/searchField/searchFieldProps";

function ProductTaskViewer({
                               task = null
                           }) {
    const [taskState, setTaskState] = React.useState(task)


    // const [operations, setOperations] = React.useState(task.operation_id ? [task.operation_id] : []) // contains 1 object

    React.useEffect(() => {
        // onUpdate(task)
        // setTas
        console.log('task changed', task)
        setTaskState(task)
    }, [])


    return (
        <div className={'calculation-product-task-container'}>
            {/*<svg className={'calculation-delete-product-button'}*/}
            {/*     onClick={() => {*/}
            {/*     }}*/}
            {/*     width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*    <path*/}
            {/*        d="M14.5772 12.5002L21.1397 5.94811C21.3358 5.75196 21.446 5.48592 21.446 5.20853C21.446 4.93113 21.3358 4.66509 21.1397 4.46894C20.9435 4.27279 20.6775 4.1626 20.4001 4.1626C20.1227 4.1626 19.8566 4.27279 19.6605 4.46894L13.1084 11.0314L6.55632 4.46894C6.36017 4.27279 6.09413 4.1626 5.81673 4.1626C5.53934 4.1626 5.2733 4.27279 5.07715 4.46894C4.881 4.66509 4.77081 4.93113 4.77081 5.20853C4.77081 5.48592 4.881 5.75196 5.07715 5.94811L11.6397 12.5002L5.07715 19.0523C4.97952 19.1491 4.90202 19.2643 4.84914 19.3913C4.79626 19.5182 4.76903 19.6543 4.76903 19.7919C4.76903 19.9294 4.79626 20.0655 4.84914 20.1925C4.90202 20.3194 4.97952 20.4346 5.07715 20.5314C5.17399 20.6291 5.2892 20.7066 5.41613 20.7595C5.54307 20.8123 5.67922 20.8396 5.81673 20.8396C5.95425 20.8396 6.0904 20.8123 6.21734 20.7595C6.34427 20.7066 6.45948 20.6291 6.55632 20.5314L13.1084 13.9689L19.6605 20.5314C19.7573 20.6291 19.8725 20.7066 19.9995 20.7595C20.1264 20.8123 20.2626 20.8396 20.4001 20.8396C20.5376 20.8396 20.6737 20.8123 20.8007 20.7595C20.9276 20.7066 21.0428 20.6291 21.1397 20.5314C21.2373 20.4346 21.3148 20.3194 21.3677 20.1925C21.4205 20.0655 21.4478 19.9294 21.4478 19.7919C21.4478 19.6543 21.4205 19.5182 21.3677 19.3913C21.3148 19.2643 21.2373 19.1491 21.1397 19.0523L14.5772 12.5002Z"*/}
            {/*        fill="#4C4C4C"/>*/}
            {/*</svg>*/}
            <div className={'calculation-product-task'}>
                <div className={'calculation-product-task-left'}>
                    <div className={'viewer-item'}>
                        <div className={'viewer-item-text'}>
                            Номер стадии
                        </div>
                        <div className={'viewer-item-input small'}>
                            {task.stage}
                        </div>
                    </div>

                    {/*<div className={'viewer-item'}>*/}
                    {/*    <div className={'viewer-item-text'}>*/}
                    {/*        Количество*/}
                    {/*    </div>*/}
                    {/*    <div className={'viewer-item-input small'}>*/}
                    {/*        {task.count}*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={'viewer-item'}>
                        <div className={'viewer-item-text'}>
                            Операция
                        </div>
                        <div className={'viewer-item-input'}>
                            {task.operation.operation_name}
                            {/*{taskState.operation_id}*/}
                        </div>
                    </div>
                    <div className={'viewer-item'}>
                        <div className={'viewer-item-text'}>
                            Исполнитель
                        </div>
                        <div className={'viewer-item-input'}>
                            {task.executor.second_name + ' ' + task.executor.first_name + ' ' + task.executor.third_name + ' (' +
                                task.executor.email + ')'}
                        </div>
                    </div>

                    {/*<SearchField type={searchFieldProps.operation} baseList={operations}*/}
                    {/*             onUpdate={(items) => {*/}

                    {/*                 // console.log('get manager', items[0])*/}
                    {/*                 if (items[0]) {*/}
                    {/*                     task.operation = items[0]*/}
                    {/*                     task.task_name = task.operation.operation_name*/}
                    {/*                     task.operation_id = items[0].id*/}
                    {/*                 }*/}

                    {/*                 setOperations(items)*/}
                    {/*                 // onUpdate(task)*/}
                    {/*             }*/}
                    {/*                 // setManagers(items)*/}
                    {/*             } listLimit={1}/>*/}
                </div>
                <div className={'calculation-product-task-right'}>
                    <div className={'editor-item'}>
                        <div className={'editor-item-text'}>
                            Комментарий к операции
                        </div>
                        <textarea className={'editor-item-textarea calculation'}
                                  value={task.description}
                                  disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductTaskViewer;