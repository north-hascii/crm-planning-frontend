import React from 'react';
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";
import {getSpecialtiesByPartName} from "../../http/specialtyApi";
import ProductTask from "./ProductTask";

function OrderProduct(
    {
        product,
        // tasks,
        onUpdate = (product) => {

        },
        onDelete = () => {

        }
    }
) {

    const [productState, setProductState] = React.useState(product)

    const [tasksArray, setTasksArray] = React.useState(product.task_list)

    const [productName, setProductName] = React.useState('')
    const [productCount, setProductCount] = React.useState(1)

    React.useEffect(() => {
        setProductState(product)
        setTasksArray(product.task_list)
    }, [product.product_id, productState, tasksArray])

    const createEmptyTask = () => {
        let stage = 1
        console.log(tasksArray.length, tasksArray.length > 1)
        if (tasksArray.length > 0) {
            console.log('tasks', tasksArray)
            stage = tasksArray[tasksArray.length - 1].stage
        }

        return {
            "task_name": "",
            "stage": stage,
            "description": "",
            "operation_id": 0,
            "count": 1,
            "status": ""
        }
    }

    const deleteFromTaskList = (index) => {
        console.log('delete task index', tasksArray[index])
        // const newArray = [...tasksArray];
        // newArray.splice(index, 1);
        // setTasksArray(newArray);
    }

    const updateProductName = (text) => {
        product.product_name = text
        setProductName(text)
        onUpdate(product)
    }

    const addTasksToArray = () => {
        product.task_list.push(createEmptyTask())
        setTasksArray(product.task_list)
        setProductState(product)
        onUpdate(product)
    }

    const updateTasksArray = (task, index) => {
        let newArr = [...tasksArray]
        newArr[index] = task
        product.task_list = newArr
        setProductState(product)
        onUpdate(product)
        // setTasksArray(newArr)
    }

    const increaseProductCount = () => {
        product.count = productCount + 1
        setProductCount(productCount + 1)
        onUpdate(product)
    }


    const decreaseProductCounter = () => {
        if (productCount - 1 > 0) {
            product.count = productCount - 1
            setProductCount(productCount - 1)
            onUpdate(product)
        }
    }

    return (
        <div className={'calculation-product-container'}>
            <svg className={'calculation-delete-product-button'}
                 onClick={() => {
                     // onDelete(product.product_id)
                     onDelete()
                 }}
                 width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.5772 12.5002L21.1397 5.94811C21.3358 5.75196 21.446 5.48592 21.446 5.20853C21.446 4.93113 21.3358 4.66509 21.1397 4.46894C20.9435 4.27279 20.6775 4.1626 20.4001 4.1626C20.1227 4.1626 19.8566 4.27279 19.6605 4.46894L13.1084 11.0314L6.55632 4.46894C6.36017 4.27279 6.09413 4.1626 5.81673 4.1626C5.53934 4.1626 5.2733 4.27279 5.07715 4.46894C4.881 4.66509 4.77081 4.93113 4.77081 5.20853C4.77081 5.48592 4.881 5.75196 5.07715 5.94811L11.6397 12.5002L5.07715 19.0523C4.97952 19.1491 4.90202 19.2643 4.84914 19.3913C4.79626 19.5182 4.76903 19.6543 4.76903 19.7919C4.76903 19.9294 4.79626 20.0655 4.84914 20.1925C4.90202 20.3194 4.97952 20.4346 5.07715 20.5314C5.17399 20.6291 5.2892 20.7066 5.41613 20.7595C5.54307 20.8123 5.67922 20.8396 5.81673 20.8396C5.95425 20.8396 6.0904 20.8123 6.21734 20.7595C6.34427 20.7066 6.45948 20.6291 6.55632 20.5314L13.1084 13.9689L19.6605 20.5314C19.7573 20.6291 19.8725 20.7066 19.9995 20.7595C20.1264 20.8123 20.2626 20.8396 20.4001 20.8396C20.5376 20.8396 20.6737 20.8123 20.8007 20.7595C20.9276 20.7066 21.0428 20.6291 21.1397 20.5314C21.2373 20.4346 21.3148 20.3194 21.3677 20.1925C21.4205 20.0655 21.4478 19.9294 21.4478 19.7919C21.4478 19.6543 21.4205 19.5182 21.3677 19.3913C21.3148 19.2643 21.2373 19.1491 21.1397 19.0523L14.5772 12.5002Z"
                    fill="#4C4C4C"/>
            </svg>
            <div className={'calculation-product-info'}>
                <div className={'editor-item'}>
                    {/*TODO: remove log*/}
                    <div className={'editor-item-text'} onClick={() => console.log(tasksArray)}>
                        Название продукта
                        {/*{product.product_id}*/}
                    </div>
                    <input className={'editor-item-input green-border'}
                           required
                           name={'second_name'}
                           type={'text'}
                           value={productState.product_name}
                           onChange={(e) => updateProductName(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Количество
                    </div>
                    <div className={'editor-item-input-container'}>
                        <input className={'editor-item-input green-border quantity'}
                               required
                               name={'second_name'}
                               type={'number'}
                               onChange={(e) => {
                               }}
                               value={productState.count}
                        />

                        <svg className={'increase-quantity-button'}
                             onClick={() => increaseProductCount()}
                             width="20" height="20" viewBox="0 0 20 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10.0603 3.49925C10.3364 3.49925 10.5603 3.72311 10.5603 3.99925V9.56026H16.1207C16.3968 9.56026 16.6207 9.78412 16.6207 10.0603C16.6207 10.3364 16.3968 10.5603 16.1207 10.5603H10.5603V16.1205C10.5603 16.3966 10.3364 16.6205 10.0603 16.6205C9.78412 16.6205 9.56026 16.3966 9.56026 16.1205V10.5603H3.99948C3.72334 10.5603 3.49948 10.3364 3.49948 10.0603C3.49948 9.78412 3.72334 9.56026 3.99948 9.56026H9.56026V3.99925C9.56026 3.72311 9.78412 3.49925 10.0603 3.49925Z"
                                  fill="#4C4C4C" fillOpacity="0.5"/>
                        </svg>
                        <svg className={'decrease-quantity-button'}
                             onClick={() => decreaseProductCounter()}
                             width="21" height="20" viewBox="0 0 21 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M19.6084 10C19.6084 14.9706 15.579 19 10.6084 19C5.63784 19 1.6084 14.9706 1.6084 10C1.6084 5.02944 5.63784 1 10.6084 1C15.579 1 19.6084 5.02944 19.6084 10ZM20.6084 10C20.6084 15.5228 16.1312 20 10.6084 20C5.08555 20 0.608398 15.5228 0.608398 10C0.608398 4.47715 5.08555 0 10.6084 0C16.1312 0 20.6084 4.47715 20.6084 10ZM16.7291 10.5603C17.0052 10.5603 17.2291 10.3364 17.2291 10.0603C17.2291 9.78412 17.0052 9.56026 16.7291 9.56026L4.60788 9.56026C4.33174 9.56026 4.10788 9.78412 4.10788 10.0603C4.10788 10.3364 4.33174 10.5603 4.60788 10.5603L16.7291 10.5603Z"
                                  fill="#4C4C4C" fillOpacity="0.5"/>
                        </svg>
                    </div>
                </div>

            </div>
            {/*{console.log(product.task_id, product.task_list)}*/}
            {tasksArray.map((item, index) => {
                return (
                    <ProductTask task={item}
                                 onUpdate={(task) => updateTasksArray(task, index)}
                                 onDelete={() => deleteFromTaskList(index)}
                                 key={index}/>
                )
            })}
            <div className={'button-container'}>
                <Button text={'Добавить операцию'}
                        size={buttonProps.size.small}
                        color={buttonProps.color.light}
                        bgColor={buttonProps.background_color.dark_v1}
                        onClck={() =>  {
                            addTasksToArray()
                        }}
                        type={'submit'}
                />
            </div>
        </div>
    );
}

export default OrderProduct;