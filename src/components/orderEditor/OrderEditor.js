import React from 'react';
import './OrderEditor.scss'
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import {useNavigate} from "react-router-dom";
import {ORDER_INFO_ROUTE} from "../../utils/consts";

function OrderEditor({order}) {

    const [orderName, setOrderName] = React.useState(order.order_name)
    const [status, setStatus] = React.useState(order.status)
    const [customerCompany, setCustomerCompany] = React.useState(order.customer_company)
    const [nameCustomer, setNameCustomer] = React.useState(order.customer_name)
    const [phoneCustomer, setPhoneCustomer] = React.useState(order.phone_customer)
    const [emailCustomer, setEmailCustomer] = React.useState(order.email_customer)
    const [startDate, setStartDate] = React.useState(order.start_date)
    const [endDate, setEndDate] = React.useState(order.end_date)
    const [description, setDescription] = React.useState(order.description)
    const [managerState, setManagerState] = React.useState(order.manager_user)

    const navigate = useNavigate()

    const getManagerName = () => {
        console.log(order.manager_user)
        return order.manager_user.first_name + ' ' + order.manager_user.second_name + ' ' + order.manager_user.third_name
    }

    const redirectToInfo = (orderId) => {
        // TODO: Сохранить изменение заказа (вызвать update)
        console.log("REDIRECT TO INFO: " + orderId)
        navigate(`${ORDER_INFO_ROUTE}/${orderId}`)
    }

    return (
        <div className={'editor-container'}>
            <div className={'editor-container-left'}>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Название проекта
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'second_name'}
                           type={'text'}
                           value={orderName}
                           placeholder={'Введите название проекта...'}
                           onChange={(e) => setOrderName(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Компания заказчика
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'first_name'}
                           type={'text'}
                           value={customerCompany}
                           placeholder={'Введите компанию заказчика...'}
                           onChange={(e) => setCustomerCompany(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        ФИО заказчика
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'first_name'}
                           type={'text'}
                           value={nameCustomer}
                           placeholder={'Введите ФИО заказчика...'}
                           onChange={(e) => setNameCustomer(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Почта заказчика
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'first_name'}
                           type={'text'}
                           value={emailCustomer}
                           placeholder={'Введите почту заказчика...'}
                           onChange={(e) => setEmailCustomer(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Телефон заказчика
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'first_name'}
                           type={'text'}
                           value={phoneCustomer}
                           placeholder={'Введите телефон заказчика...'}
                           onChange={(e) => setPhoneCustomer(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Ответственный за проект
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'third_name'}
                           type={'text'}
                           value={getManagerName()}
                        // onChange={(e) => setManager(e.target.value)} TODO: ПОКА НЕ МЕНЯЕТСЯ !!!
                    />
                </div>
            </div>

            {/*{  TODO: EDIT Сделать нормальный css, у Тёмы лапки... Текст в левый угол; Положение кнопки пофиксить */}
            <div className={'editor-container-right'}>
                <div className={'editor-item-big'}>
                    <div className={'editor-item-text-big'}>
                        Описание проекта
                    </div>
                    <input className={'editor-item-input-big'}
                           required
                           name={'first_name'}
                           type={'text'}
                           value={description}
                           placeholder={'Введите описание проекта...'}
                           onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className={'flex-left-row'}>
                    <Button text={'Сохранить'}
                            size={buttonProps.size.small}
                            color={buttonProps.color.light}
                            bgColor={buttonProps.background_color.dark_v1}
                            onClck={() => redirectToInfo(order.id)}
                    />
                    <Button text={'Перейти к Калькуляции'}
                            size={buttonProps.size.small}
                            color={buttonProps.color.light}
                            bgColor={buttonProps.background_color.dark_v1}
                    />
                </div>

            </div>
        </div>
    );
}

export default OrderEditor;