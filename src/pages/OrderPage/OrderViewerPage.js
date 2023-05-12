import React from 'react';
import '../ViewerPage.scss'
import UserEditor from "../../components/adminEditor/UserEditor";
import OrderViewer from "./OrderViewer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import OrderEditor from "./OrderEditor";
import {getUserById} from "../../http/userApi";
import {createOrder, getOrderById} from "../../http/orderApi";
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";
import OrderCalculationEditor from "./OrderCalculationEditor";
import OrderCalculationViewer from "./OrderCalculationViewer";

function OrderViewerPage(props) {
//     const {id} = useParams()
//
//     const [isLoading, setIsLoading] = React.useState(true)
//     const [order, setOrder] = React.useState(null)
//     const [manager, setManager] = React.useState(null)
//
//     React.useEffect(() => {
//         setIsLoading(true)
//         getOrderById(id).then(data => {
//             // console.log(data)
//             setOrder(data)
//             getUserById(data.manager_id).then(managerData => {
//                 // console.log(managerData)
//                 setManager(managerData)
//                 setIsLoading(false)
//             }).catch(err => {
//                 console.log("Error while getting data", err)
//                 setIsLoading(false)
//             })
//             // setIsLoading(false)
//         }).catch(err => {
//             console.log("Error while getting data", err)
//             setIsLoading(false)
//         })
//     }, [])
//
//     if (isLoading) {
//         return (
//             <div>
//                 Loading
//             </div>
//         )
//     }
//     return (
//         <div className={'admin-page-edit'}>
//             <div className={'admin-page-container'}>
//                 <div className={'page-title'}>
//                    Информация о заказе
//                 </div>
//                 <OrderViewer order={order} manager={manager}/>
//             </div>
//         </div>
//     );
// }

    const sections = {
        info: 'info',
        calculation: 'calculation'
    }

    const getTasks = (order) => {

    }



    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [order, setOrder] = React.useState(null)
    const [manager, setManager] = React.useState(null)
    const [section, setSection] = React.useState(sections.info)

    const [products, setProducts] = React.useState(null)

    React.useEffect(() => {
        setIsLoading(true)
        getOrderById(id).then(data => {
            console.log('GET order', data)
            setOrder(data)
            setProducts(data.product_list)
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
                <div className={'page-title-container'}>
                    <div className={'page-title'}>
                        Просмотр заказа
                    </div>
                    <div className={'page-title-buttons-container'}>
                        <Button text={'Контактные данные'}
                                size={buttonProps.size.small}
                                color={buttonProps.color.dark}
                                bgColor={buttonProps.background_color.grey}
                                isActive={section === sections.info}
                                onClck={() => setSection(sections.info)}
                        />
                        <Button text={'Калькуляция'}
                                size={buttonProps.size.small}
                                color={buttonProps.color.dark}
                                bgColor={buttonProps.background_color.grey}
                                isActive={section === sections.calculation}
                                onClck={() => setSection(sections.calculation)}
                        />
                    </div>
                </div>
                {section === sections.info &&
                    // <OrderEditor order={order} manager={manager} type={'creator'} onUpdate={(ord) => {
                    //     // console.log('try to upd order for parent', ord)
                    //     // setIsLoading(true)
                    //     setOrder(ord)
                    //
                    //     // setTimeout(() => {
                    //     // setIsLoading(false)
                    //     // }, 3000)
                    // }}/>
                    <OrderViewer order={order} manager={manager}/>
                }
                {/*{console.log('SEND order', order)}*/}
                {section === sections.calculation &&

                    <OrderCalculationViewer products={products}/>

                     // console.log('SEND order', order.product_list, products)
                    // <OrderCalculationEditor products={products} onUpdate={(items) => {
                    //     // console.log('try to upd order for parent')
                    //     order.product_list = items
                    //     setProducts(items)
                    //     setOrder(order)
                    // }}/>
                }
            </div>
        </div>
    );
}
export default OrderViewerPage;