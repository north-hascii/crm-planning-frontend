import React from 'react';
import ProductTask from "./ProductTask";
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";
import ProductTaskViewer from "./ProductTaskViewer";

function OrderProductViewer(
    {
        product,
    }
) {

    const [isLoading, setIsLoading] = React.useState(true)
    const [productState, setProductState] = React.useState(product)

    const [tasksArray, setTasksArray] = React.useState(null)

    const [productName, setProductName] = React.useState('')
    const [productCount, setProductCount] = React.useState(1)

    React.useEffect(() => {

        console.log('OrderProductViewer GET',product)
        setProductState(product)
        setTasksArray(product.task_list)
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return (
            <div>
                Loading
            </div>
        )
    }
    return (
        <div className={'calculation-product-container'}>
            <div className={'calculation-product-info'}>
                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Название продукта
                    </div>
                    <div className={'viewer-item-input medium green-border'}>
                        {productState.product_name}
                    </div>
                </div>
                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Количество
                    </div>
                    <div className={'viewer-item-input small green-border'}>
                        {productState.count}
                    </div>
                </div>

            </div>
            {tasksArray && tasksArray.map((item, index) => {
                return (
                    <ProductTaskViewer task={item}
                                 key={index}/>
                )
            })}
        </div>
    );
}

export default OrderProductViewer;