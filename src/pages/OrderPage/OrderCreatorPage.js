import React from 'react';
import {useParams} from "react-router-dom";
import {createOrder, getOrderById} from "../../http/orderApi";
import {createUser, getUserById, updateUser} from "../../http/userApi";
import OrderEditor from "./OrderEditor";
import {buttonProps} from "../../components/Button/ButtonProps";
import Button from "../../components/Button/Button";
import OrderCalculationEditor from "./OrderCalculationEditor";
import {pageMods} from "../../utils/consts";

function OrderCreatorPage() {

    const sections = {
        info: 'info',
        calculation: 'calculation'
    }

    const [isLoading, setIsLoading] = React.useState(true)
    const [order, setOrder] = React.useState(null)
    const [manager, setManager] = React.useState(null)
    const [section, setSection] = React.useState(sections.info)

    const [products, setProducts] = React.useState([])

    const createEmptyOrder = () => {
        return {
            "order_name": '',
            "status": 'waiting',
            "customer_company": '',
            "customer_name": '',
            "phone_customer": '',
            "email_customer": '',
            "description": 'text',
            "manager_id": -1,
            "start_date": '',
            "product_list": [],
        }
    }


    React.useEffect(() => {
        console.log('create empty order')
        setOrder(createEmptyOrder())
        setIsLoading(false)
    }, [])

    React.useEffect(() => {
        console.log(section)
    }, [section])

    React.useEffect(() => {
        console.log('parent got order', order)
    },[order])

    React.useEffect(() => {
        console.log('parent got products', products)
        // let tmp = order
        // tmp.product_list = products
        // setOrder(tmp)
    },[products])

    // const clickOnSave = async (e) => {
    //     e.preventDefault()
    //     if (mod === pageMods.editor) {
    //         makeUpdateRequest()
    //     }
    //     if (mod === pageMods.creator) {
    //         makeCreateRequest(e)
    //     }
    // }
    //
    // const makeUpdateRequest = () => {
    //     updateUser(
    //         user.id,
    //         email,
    //         firstName,
    //         secondName,
    //         thirdName,
    //         role,
    //         status,
    //         specialtyIdList
    //     ).then(data => {
    //         console.log(data)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    const makeCreateRequest =  () => {
        // e.preventDefault()
        order.start_date = new Date()
        createOrder(
            order
        ).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }

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
                        Создание заказа
                    </div>
                    <div className={'page-title-buttons-container'}>
                        <Button text={'Контактные данные'}
                                size={buttonProps.size.small}
                                color={buttonProps.color.dark}
                                bgColor={buttonProps.background_color.grey}
                                isActive={section === sections.info}
                                onClck={() => setSection(sections.info)}
                            // type={'submit'}
                        />
                        <Button text={'Калькуляция'}
                                size={buttonProps.size.small}
                                color={buttonProps.color.dark}
                                bgColor={buttonProps.background_color.grey}
                                isActive={section === sections.calculation}
                                onClck={() => setSection(sections.calculation)}
                            // type={'submit'}
                        />
                        <Button text={'Сохранить заказ'}
                                size={buttonProps.size.small}
                                color={buttonProps.color.light}
                                bgColor={buttonProps.background_color.dark_v1}
                                onClck={() => {
                                    makeCreateRequest()
                                }}
                            // type={'submit'}
                        />
                    </div>
                </div>
                {section === sections.info &&
                    <OrderEditor order={order} manager={manager} mod={pageMods.editor} onUpdate={(ord) => {
                        // console.log('try to upd order for parent', ord)
                        // setIsLoading(true)
                        setOrder(ord)

                        // setTimeout(() => {
                            // setIsLoading(false)
                        // }, 3000)
                    }}/>
                }
                {section === sections.calculation &&
                    <OrderCalculationEditor products={products} onUpdate={(items) => {
                        // console.log('try to upd order for parent')
                        order.product_list = items
                        setProducts(items)
                        setOrder(order)
                    }}/>
                }
            </div>
        </div>
    );
}

export default OrderCreatorPage;