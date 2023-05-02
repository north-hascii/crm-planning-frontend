import React from 'react';
import '../ViewerPage.scss'
import UserEditor from "../../components/adminEditor/UserEditor";
import OrderViewer from "./OrderViewer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import OrderEditor from "./OrderEditor";
import {getUserById} from "../../http/userApi";
import {getOrderById} from "../../http/orderApi";

function OrderItemPage(props) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [order, setOrder] = React.useState(null)
    const [manager, setManager] = React.useState(null)

    React.useEffect(() => {
        setIsLoading(true)
        getOrderById(id).then(data => {
            // console.log(data)
            setOrder(data)
            getUserById(data.manager_id).then(managerData => {
                // console.log(managerData)
                setManager(managerData)
                setIsLoading(false)
            }).catch(err => {
                console.log("Error while getting data", err)
                setIsLoading(false)
            })
            // setIsLoading(false)
        }).catch(err => {
            console.log("Error while getting data", err)
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
                   Информация о заказе
                </div>
                <OrderViewer order={order} manager={manager}/>
            </div>
        </div>
    );
}

export default OrderItemPage;