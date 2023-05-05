import React from 'react';
import {useParams} from "react-router-dom";
import {getOrderById} from "../../http/orderApi";
import {getUserById} from "../../http/userApi";
import OrderEditor from "./OrderEditor";
import {buttonProps} from "../../components/Button/ButtonProps";
import Button from "../../components/Button/Button";
import OrderCalculationEditor from "./OrderCalculationEditor";

function OrderCreatorPage(props) {
    const {id} = useParams()

    const sections = {
        info: 'info',
        calculation: 'calculation'
    }

    const [isLoading, setIsLoading] = React.useState(true)
    const [order, setOrder] = React.useState(null)
    const [manager, setManager] = React.useState(null)
    const [section, setSection] = React.useState(sections.info)

    const [products, setProducts] = React.useState([])


    React.useEffect(() => {
        setIsLoading(false)
    }, [])

    React.useEffect(() => {
        console.log(section)
    }, [section])

    // const changeSection = (section) => {
    //     setSection(section)
    // }

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
                                onClck={() => {}}
                            // type={'submit'}
                        />
                    </div>
                </div>
                {section === sections.info &&
                <OrderEditor order={order} manager={manager} type={'creator'}/>
                }
                {section === sections.calculation &&
                <OrderCalculationEditor products={products} onUpdate={(items) => setProducts(items)}/>
                }
            </div>
        </div>
    );
}

export default OrderCreatorPage;