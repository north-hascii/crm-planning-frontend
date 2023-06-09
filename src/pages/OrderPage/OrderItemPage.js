import React from 'react';
import '../ViewerPage.scss'
import UserEditor from "../../components/adminEditor/UserEditor";
import OrderViewer from "./OrderViewer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import OrderEditor from "./OrderEditor";
import {getUserById} from "../../http/userApi";
import {getOrderById} from "../../http/orderApi";

function OrderItemPage(props) {
    const location = useLocation()

    const [isViewer, setIsViewer] = React.useState(false)

    // React.useEffect(() => {
    //     if (location.pathname.indexOf('edit') > -1) {
    //         setIsViewer(false)
    //         // console.log('edit')
    //     }
    //     if (location.pathname.indexOf('view') > -1) {
    //         setIsViewer(true)
    //         // console.log('edit')
    //     }
    //
    // }, [])

    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [order, setOrder] = React.useState(null)
    const [manager, setManager] = React.useState(null)
    const navigate = useNavigate()


    React.useEffect(() => {
        if (location.pathname.indexOf('edit') > -1) {
            setIsViewer(false)
            console.log('edit')
        }
        if (location.pathname.indexOf('view') > -1) {
            setIsViewer(true)
            console.log('view')
        }

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
                    {isViewer ? 'Информация о заказе' : 'Редактирование заказа'}
                </div>
                {/*<UserEditor user={user}/>*/}
                {isViewer ?
                    <OrderViewer order={order} manager={manager}/>
                    :
                    <OrderEditor/>
                }
            </div>
        </div>
    );
}

export default OrderItemPage;