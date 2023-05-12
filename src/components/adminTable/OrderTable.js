import React from 'react';
import {useNavigate} from "react-router-dom";
// import {ADMIN_SPECIALTY_ROUTE, appRoutes, ORDER_ROUTE, ORDER_VIEW_ROUTE} from "../../utils/consts";
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import {appRoutes} from "../../utils/consts";

function OrderTable({tableItems = []}) {
    const navigate = useNavigate()

    // TODO
    const deleteTableItem = (item) => {
        console.log(item)
    }

    const redirectToEditor = (item) => {
        navigate(`${appRoutes.admin.ADMIN_SPECIALTY_ROUTE}/${item.id}`)
    }

    // console.log(tableItems)

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
                        {item.id}
                    </th>
                    <th className={'admin-table-col'}>
                        {item.order_name}
                    </th>
                    <th className={'admin-table-col'}>
                        {item.status}
                    </th>
                    <th className={'admin-table-col'}>
                        {item.customer_company}
                    </th>
                    <th className={'admin-table-col'}>
                        <Button
                            size={buttonProps.size.small}
                            bgColor={buttonProps.background_color.dark_v1}
                            color={buttonProps.color.light}
                            text={'Сформировать дату'}
                        />
                    </th>
                    <th className={'admin-table-col medium'}>
                        <Button
                            size={buttonProps.size.small}
                            bgColor={buttonProps.background_color.dark_v1}
                            color={buttonProps.color.light}
                            text={'Открыть'}
                            onClck={() => navigate(appRoutes.order.ORDER_VIEW_ROUTE + '/' + item.id)}
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