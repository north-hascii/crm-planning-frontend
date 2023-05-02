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
    const [productList, setProductList] = React.useState([])
    const [createdProductsCount, setCreatedProductCount] = React.useState(0)
    // const [pro]

    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        // console.log(productList)
    }, [productList])

    const createEmptyProduct = () => {
        setCreatedProductCount(createdProductsCount + 1)
        return {
            // "product_id": createdProductsCount + 1, // only frontend
            "product_name": "",
            "status": "",
            "count": 1,
            task_list: []
        }
    }

    const updateProductList = (product, index) => {
        let newArr = [...productList]
        newArr[index] = product
        setProductList(newArr)
    }

    const deleteFromProductList = (index) => {
        console.log('delete product index', index)
        const newArray = [...productList];
        // console.log(newArray)
        newArray.splice(index, 1);
        // console.log(newArray)
        setProductList(newArray);
    }

    // const deleteFromProductList = (id) => {
    //     console.log('delete prod with id', id)
    //     setProductList(productList.filter(item => item.product_id !== id))
    //     // setCreatedProductCount(createdproductsCount - 1)
    // }

    return (
        <div className={'admin-page-edit'}>
            <div className={'admin-page-container'}>
                <div className={'page-title'} onClick={() => console.log(productList)}>
                    Калькуляция
                </div>
                {productList.map((item, index) => {
                    // console.log('show prod:', item)
                    return (
                        <OrderProduct
                            key={index}
                            product={item}
                            tasks={item.task_list}
                            onUpdate={(product) => updateProductList(product, index)}
                            onDelete={() => deleteFromProductList(index)}
                        />
                    )
                })}
                <div className={'button-container'}>
                    <Button text={'Добавить продукт'}
                            size={buttonProps.size.small}
                            color={buttonProps.color.light}
                            bgColor={buttonProps.background_color.dark_v1}
                            onClck={() => setProductList([...productList, createEmptyProduct()])}
                            type={'submit'}/>
                </div>
            </div>
        </div>
    );
}

export default OrderCalculationPage;