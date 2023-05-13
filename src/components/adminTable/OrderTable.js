import React from 'react';
import {useNavigate} from "react-router-dom";
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import {appRoutes} from "../../utils/consts";
import {getOrderEndDateById} from "../../http/orderApi";
import {formatDate} from "../../utils/util";

function OrderTable({tableItems = []}) {
    const navigate = useNavigate()

    // TODO
    const deleteTableItem = (item) => {
        console.log(item)
    }

    const redirectToEditor = (item) => {
        navigate(`${appRoutes.admin.ADMIN_SPECIALTY_ROUTE}/${item?.id}`)
    }

    const getOrderEndDate = (item, orderId) => {
        getOrderEndDateById(orderId).then(data => {
            console.log('order id end date',orderId, data)
            item.end = data
        }).catch(err => {
            console.log("Error while getting data", err)
            // alert('Не удалось найти задачи.')
        })
    }

    return (
        <table className={`admin-table rounded-corners`}>
            <tbody>
            <tr className={'table-col-names'}>
                <th className={'admin-table-col small'}>
                    id
                </th>
                <th className={'admin-table-col'}>
                    Название проекта
                </th>
                <th className={'admin-table-col'}>
                    Статус
                </th>
                <th className={'admin-table-col'}>
                    Заказчик
                </th>
                <th className={'admin-table-col'}>
                    Дата сдачи
                </th>
                <th className={'admin-table-col medium'}>
                </th>
            </tr>

            {tableItems && tableItems.map((item, index) => {
                return (<tr key={index}>
                    <th className={'admin-table-col small'}>
                        {item?.id}
                    </th>
                    <th className={'admin-table-col'}>
                        {item?.order_name}
                    </th>
                    <th className={'admin-table-col'}>
                        {item?.status}
                    </th>
                    <th className={'admin-table-col'}>
                        {item?.customer_company}
                    </th>
                    <th className={'admin-table-col'}>
                        {/*<Button*/}
                        {/*    size={buttonProps.size.small}*/}
                        {/*    bgColor={buttonProps.background_color.dark_v1}*/}
                        {/*    color={buttonProps.color.light}*/}
                        {/*    text={'Сформировать дату'}*/}
                        {/*    onClck={() => {*/}
                        {/*        getOrderEndDate(item, item.id)*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {formatDate(item?.end_date)}
                    </th>
                    <th className={'admin-table-col medium'}>
                        <Button
                            size={buttonProps.size.small}
                            bgColor={buttonProps.background_color.dark_v1}
                            color={buttonProps.color.light}
                            text={'Открыть'}
                            onClck={() => navigate(appRoutes.order.ORDER_VIEW_ROUTE + '/' + item?.id)}
                        />
                    </th>
                </tr>)
            })
            }
            </tbody>
        </table>
    );
}

export default OrderTable;