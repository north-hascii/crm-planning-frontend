import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getOrderById} from "../../http/orderApi";
import OrderEditor from "../../components/orderEditor/OrderEditor";
import OrderInfo from "../../components/orderInfo/OrderInfo";
import {ORDER_INFO_ROUTE, ORDER_EDIT_ROUTE} from "../../utils/consts";
import CalculationStageInfo from "../../components/orderCalculationInfo/CalculationStageInfo";


function OrderCalculationInfoPage(props) {
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

    const redirectToOrderEditor = (orderId) => {
        navigate(`${ORDER_EDIT_ROUTE}/${orderId}`)
    }

    return (
        <div className={'admin-page-edit'}>
            <div className={'admin-page-container'}>
                {order && order.stage_id_list.length > 0 ? order.stage_id_list.map((stage, index) => {
                        return (
                            <CalculationStageInfo stage={stage} index={index}/>
                        )
                    })
                    :
                    <div className={`search-result`}>
                        Заказ не имеет стадий произодства
                    </div>
                }
            </div>
        </div>
    )
        ;
}

export default OrderCalculationInfoPage;