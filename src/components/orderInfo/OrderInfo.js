import React from 'react';
import '../orderEditor/OrderEditor.scss'
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import {
    ORDER_CALCULATION_EDIT_ROUTE,
    ORDER_CALCULATION_INFO_ROUTE,
    ORDER_EDIT_ROUTE,
    ORDER_INFO_ROUTE
} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

function OrderEditor({order}) {
    const navigate = useNavigate()

    const getManagerName = () => {
        console.log(order.manager_user)
        return order.manager_user.first_name + ' ' + order.manager_user.second_name + ' ' + order.manager_user.third_name
    }

    const redirectToOrderCalculationInfo = (orderId) => {
        navigate(`${ORDER_CALCULATION_INFO_ROUTE}/${orderId}`)
    }

    return (
        <div className={'editor-container'}>
            <div className={'editor-container-left'}>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Название проекта
                    </div>
                    <div className={'editor-item-input'}>
                        {order.order_name}
                    </div>
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Компания заказчика
                    </div>
                    <div className={'editor-item-input'}>
                        {order.customer_company}
                    </div>
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        ФИО заказчика
                    </div>
                    <div className={'editor-item-input'}>
                        {order.customer_name}
                    </div>
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Почта заказчика
                    </div>
                    <div className={'editor-item-input'}>
                        {order.email_customer}
                    </div>
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Телефон заказчика
                    </div>
                    <div className={'editor-item-input'}>
                        {order.phone_customer}
                    </div>
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Ответственный за проект
                    </div>
                    <div className={'editor-item-input'}>
                        {getManagerName()}
                    </div>
                </div>
            </div>

            {/*{  TODO: INFO Сделать нормальный css, у Тёмы лапки... Текст в левый угол; Положение кнопки пофиксить */}
            <div className={'editor-container-right'}>
                <div className={'editor-item-big'}>
                    <div className={'editor-item-text-big'}>
                        Описание проекта
                    </div>
                    <div className={'editor-item-input'}>
                        {order.description}
                    </div>
                </div>

                <Button text={'Перейти к Калькуляции'}
                        size={buttonProps.size.small}
                        color={buttonProps.color.light}
                        bgColor={buttonProps.background_color.dark_v1}
                        onClck={() => redirectToOrderCalculationInfo(order.id)}
                />
            </div>
        </div>
    );
}

export default OrderEditor;