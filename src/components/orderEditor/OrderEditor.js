import React from 'react';
import './OrderEditor.scss'
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import InputItems from "./InputItems";
import {getUserById} from "../../http/userApi";
import {useParams} from "react-router-dom";

function OrderEditor({order, manager}) {

    const [orderName, setOrderName] = React.useState(order.order_name)
    const [customerName, setCustomerName] = React.useState(order.customer_name)
    const [phoneNumber, setPhoneNumber] = React.useState(order.phone_number)
    const [status, setStatus] = React.useState(order.status)
    const [description, setDescription] = React.useState(order.description)
    const [managerState, setManagerState] = React.useState(manager)

    const getManagerName = () => {
        console.log('get', managerState)
        return manager.first_name + ' ' + manager.second_name + ' ' + manager.third_name
    }

    console.log('editor: ', manager)

    return (
        <div className={'editor-container'}>
            <div className={'editor-container-left'}>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Фамилия
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'second_name'}
                           type={'text'}
                           value={orderName}
                           onChange={(e) => setOrderName(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Имя
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'first_name'}
                           type={'text'}
                           value={getManagerName()}
                           onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Отчество
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'third_name'}
                           type={'text'}
                           value={getManagerName()}
                           // onChange={(e) => setManager(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Почта
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'email'}
                           type={'text'}
                           value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                {/*<div className={'editor-item'}>*/}
                {/*    <div className={'editor-item-text'}>*/}
                {/*        Статус*/}
                {/*    </div>*/}
                {/*    <select defaultValue={status.toString()}>*/}
                {/*        {statusKeyValue.map((item, index) => {*/}
                {/*            return (*/}
                {/*                <option value={item.name} key={index}>{item.text}</option>*/}
                {/*            )*/}
                {/*        })}*/}
                {/*    </select>*/}
                {/*</div>*/}

                <Button text={'Сохранить'}
                        size={buttonProps.size.small}
                        color={buttonProps.color.light}
                        bgColor={buttonProps.background_color.dark_v1}
                />
            </div>
        </div>
    );
}

export default OrderEditor;