import React from 'react';
import {useParams} from "react-router-dom";
import {getOrderById} from "../../http/orderApi";
import {getUserById} from "../../http/userApi";
import OrderEditor from "./OrderEditor";
import {buttonProps} from "../../components/Button/ButtonProps";
import Button from "../../components/Button/Button";

function OrderCreatorPage(props) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [order, setOrder] = React.useState(null)
    const [manager, setManager] = React.useState(null)


    React.useEffect(() => {
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
        <div className={'admin-page-edit'}>
            <div className={'admin-page-container'}>
                <div className={'page-title'}>
                    Создание заказа
                </div>
                {/*<div>*/}
                <Button text={'Контактные данные'}
                        size={buttonProps.size.small}
                        color={buttonProps.color.light}
                        bgColor={buttonProps.background_color.dark_v1}
                        // onClck={() => }
                        type={'submit'}
                />
                <Button text={'Калькуляция'}
                        size={buttonProps.size.small}
                        color={buttonProps.color.light}
                        bgColor={buttonProps.background_color.dark_v1}
                        type={'submit'}
                />
                {/*Контактные данные*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    Калькуляция*/}
                {/*</div>*/}
                <OrderEditor order={order} manager={manager} type={'creator'}/>
            </div>
        </div>
    );
}

export default OrderCreatorPage;