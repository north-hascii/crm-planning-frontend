import React from 'react';
import './OrderCalculationPage.scss'
import {getSpecialtiesByPartName} from "../../http/specialtyApi";
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";
import ProductTask from "./ProductTask";
import OrderProduct from "./OrderProduct";

const order =
    {
        "order_name": "Покрасить металл",
        "status": "В производстве",
        "customer_company": "Corp. Лебедев",
        "customer_name": "Артемий Лебедев",
        "phone_customer": "+79777777777",
        "email_customer": "a.lebedev@gmail.com",
        "description": "some description...",
        "manager_id": 1,
        "start_date": "2012-04-23T18:25:43.511Z",
        "product_list": [
            {
                "product_name": "Стул",
                "status": "start",
                "count": 2,
                "task_list": [
                    // {
                    //     "task_name": "Обработать дерево",
                    //     "stage": 1,
                    //     "description": "some task description...",
                    //     "operation_id": 1,
                    //     "count": 1,
                    //     "status": "start"
                    // },
                    // {
                    //     "task_name": "Покраска",
                    //     "stage": 1,
                    //     "description": "some task description...",
                    //     "operation_id": 2,
                    //     "count": 1,
                    //     "status": "start"
                    // }
                ]
            },
            {
                "product_name": "Стол",
                "status": "start",
                "count": 1,
                "task_list": [
                    // {
                    //     "task_name": "Обработать дерево",
                    //     "stage": 1,
                    //     "description": "some task description...",
                    //     "operation_id": 1,
                    //     "count": 1,
                    //     "status": "start"
                    // },
                    // {
                    //     "task_name": "Покраска",
                    //     "stage": 1,
                    //     "description": "some task description...",
                    //     "operation_id": 2,
                    //     "count": 1,
                    //     "status": "start"
                    // }
                ]
            }
        ]
    }

function OrderCalculationPage() {
    const [productList, setProductList] = React.useState(order.product_list)
    const [firstName, setFirstName] = React.useState('user.first_name')
    const [secondName, setSecondName] = React.useState('user.second_name')
    const [thirdName, setThirdName] = React.useState('user.third_name')
    const [email, setEmail] = React.useState('user.email')
    const [status, setStatus] = React.useState('user.status')
    const [specInSearch, setSpecInSearch] = React.useState('')

    const [isSpecInputValid, setIsSpecInputValid] = React.useState(true)

    const [isSpecialtyListVisible, setIsSpecialtyListVisible] = React.useState(false)

    const [specialtyList, setSpecialtyList] = React.useState([])
    const [specialtyIdList, setSpecialtyIdList] = React.useState([])
    const [availableSpecialtiesList, setAvailableSpecialtiesList] = React.useState([])

    const [productCounter, setProductCounter] = React.useState(1)
    const [isLoading, setIsLoading] = React.useState(true)
    const increaseCounter = () => {
        setProductCounter(productCounter + 1)
    }

    const decreaseCounter = () => {
        if (productCounter - 1 > 0) {
            setProductCounter(productCounter - 1)
        }
    }


    const clckOnSearchButton = () => {
        if (specInSearch.length > 0) {
            setIsSpecInputValid(true)
            makeSpecsSearch()
            return
        }
        setIsSpecInputValid(false)
    }

    const makeSpecsSearch = () => {
        getSpecialtiesByPartName(specInSearch).then(data => {
            setAvailableSpecialtiesList(data)
            setIsSpecialtyListVisible(true)
            setIsLoading(false)
        }).catch(err => {
            console.log("Error while getting data", err)
            setIsSpecialtyListVisible(true)
            setIsLoading(false)
        })
    }

    // const updateCounter = (num) => {
    //     if (parseInt(num) > 0 && parseInt(num) < 100) {
    //         setProductCounter(num)
    //     }
    // }

    return (
        <div className={'admin-page-edit'}>
            <div className={'admin-page-container'}>
                <div className={'page-title'}>
                    Калькуляция
                </div>
                {productList.map((item, index) => {
                    return (
                        <OrderProduct key={index} tasks={item.task_list}/>
                    )
                })}
                <div className={'button-container'}>
                    <Button text={'Добавить продукт'}
                            size={buttonProps.size.small}
                            color={buttonProps.color.light}
                            bgColor={buttonProps.background_color.dark_v1}
                            onClck={() => setProductList([...productList,  {
                                "product_name": "",
                                "status": "",
                                "count": 0,
                                task_list: []
                                // "task_list": [
                                //     {
                                //         "task_name": "Обработать дерево",
                                //         "stage": 1,
                                //         "description": "some task description...",
                                //         "operation_id": 1,
                                //         "count": 1,
                                //         "status": "start"
                                //     },
                                // ]
                            }])}
                            type={'submit'}/>
                </div>
            </div>
        </div>
    );
}

export default OrderCalculationPage;