import React from 'react';
import OrderProduct from "./OrderProduct";
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";

function OrderCalculationEditor({
                                    products = [],
                                    onUpdate = Function.prototype,
                                }) {

    const [productList, setProductList] = React.useState(products ? products : [])
    const [createdProductsCount, setCreatedProductCount] = React.useState(products.length)
    // const [pro]

    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        onUpdate(productList)
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

    return (
        <>
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
        </>
    );
}

export default OrderCalculationEditor;