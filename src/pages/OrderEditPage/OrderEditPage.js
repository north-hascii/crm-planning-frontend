import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getOrderById} from "../../http/orderApi";
import OrderEditor from "../../components/orderEditor/OrderEditor";
import OrderInfo from "../../components/orderInfo/OrderInfo";
import {ORDER_INFO_ROUTE, ORDER_EDIT_ROUTE} from "../../utils/consts";


function OrderEditPage(props) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [order, setOrder] = React.useState(null)
    const navigate = useNavigate()

    React.useEffect(() => {
        setIsLoading(true)
        getOrderById(id).then(data => {
            console.log(data)
            setOrder(data)
            setIsLoading(false)

        }).catch(err => {
            console.log("Error while getting order data", err)
            setIsLoading(false)
        })
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
                <div className={'page-header'}>
                    <div className={'page-title'}>
                        Редактирование заказа
                    </div>
                </div>
                <OrderEditor order={order}/>
            </div>
        </div>
    )
        ;
}

export default OrderEditPage;