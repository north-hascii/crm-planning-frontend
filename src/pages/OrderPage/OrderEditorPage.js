import React from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getOrderById} from "../../http/orderApi";
import {getUserById} from "../../http/userApi";
import OrderViewer from "./OrderViewer";
import OrderEditor from "./OrderEditor";
import {pageMods} from "../../utils/consts";

function OrderEditorPage(props) {
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
                    Редактирование заказа
                </div>
                <OrderEditor order={order} manager={manager} mod={pageMods.editor}/>
            </div>
        </div>
    );
}

export default OrderEditorPage;