import React from 'react';
import OrderProduct from "./OrderProduct";
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";
import OrderProductViewer from "./OrderProductViewer";

function OrderCalculationViewer({
                                    products = [],
                                }) {

    const [productList, setProductList] = React.useState(products ? products : [])
    const [createdProductsCount, setCreatedProductCount] = React.useState(products.length)
    // const [pro]

    const [isLoading, setIsLoading] = React.useState(true)


    React.useEffect(() => {
        console.log('orderCalcViewer', products)
    }, [])

    return (
        <>
            {productList.map((item, index) => {
                console.log('show prod:', item)
                return (
                    <OrderProductViewer
                        key={index}
                        product={item}
                        tasks={item.task_list}
                        // onUpdate={(product) => updateProductList(product, index)}
                        // onDelete={() => deleteFromProductList(index)}
                    />
                )
            })}
            <div className={'button-container'}>
                <Button text={'Добавить продукт'}
                        size={buttonProps.size.small}
                        color={buttonProps.color.light}
                        bgColor={buttonProps.background_color.dark_v1}
                        // onClck={() => setProductList([...productList, createEmptyProduct()])}
                        type={'submit'}/>
            </div>
        </>
    );
}


export default OrderCalculationViewer;