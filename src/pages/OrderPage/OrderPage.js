import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getOrderById} from "../../http/orderApi";
import {getUserById} from "../../http/userApi";
import OrderEditor from "../../components/orderEditor/OrderEditor";

function OrderPage(props) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [order, setOrder] = React.useState(null)
    const [manager, setManager] = React.useState(null)
    const navigate = useNavigate()

    // console.log(id)

    React.useEffect(() => {
        setIsLoading(true)
        getOrderById(id).then(data => {
            console.log(data)
            setOrder(data)

            console.log(data.manager_id)
            getUserById(data.manager_id).then(data => {
                // console.log('inside:', data)
                setManager(data)
                setIsLoading(false)
            }).catch(err => {
                console.log("Error while getting manager data", err)
                throw err
            })

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
                <div className={'page-title'}>
                    Редактирование пользователя
                </div>
                {console.log(manager)}
                <OrderEditor order={order} manager={manager}/>
            </div>
        </div>
    );
}
export default OrderPage;