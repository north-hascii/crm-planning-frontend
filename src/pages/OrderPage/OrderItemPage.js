import React from 'react';
import '../ViewerPage.scss'
import UserEditor from "../../components/adminEditor/UserEditor";
import OrderViewer from "./OrderViewer";
import {useLocation} from "react-router-dom";
import OrderEditor from "./OrderEditor";

function OrderItemPage(props) {
    const location = useLocation()

    const [isViewer, setIsViewer] = React.useState(false)

    React.useEffect(() => {
        if (location.pathname.indexOf('edit') > -1) {
            setIsViewer(false)
            // console.log('edit')
        }
        if (location.pathname.indexOf('view') > -1) {
            setIsViewer(true)
            // console.log('edit')
        }
    })
    return (
        <div className={'admin-page-edit'}>
            <div className={'admin-page-container'}>
                <div className={'page-title'}>
                    {isViewer ? 'Информация о заказе' : 'Редактирование заказа'}
                </div>
                {/*<UserEditor user={user}/>*/}
                {isViewer ?
                    <OrderViewer/>
                    :
                    <OrderEditor/>
                }
            </div>
        </div>
    );
}

export default OrderItemPage;