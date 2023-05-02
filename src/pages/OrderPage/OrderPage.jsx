import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {adminOptions} from "../AdminPage/adminOptions";
import {getAllUsers} from "../../http/userApi";
import {getAllSpecialties} from "../../http/specialtyApi";
import {getAllSOperations} from "../../http/operationApi";
import {getAllMaterials} from "../../http/materialApi";
import SectionBar from "../../components/optionsBar/SectionBar";
import {ADMIN_ROUTE} from "../../utils/consts";
import AdminTable from "../../components/adminTable/adminTable";
import OrderTable from "../../components/adminTable/OrderTable";
import MaterialTable from "../../components/adminTable/MaterialTable";
import {getAllOrders} from "../../http/orderApi";

// const tableItems = [
//     {
//         'id': 1,
//         'order_name': 'Светофор 1',
//         'status': 'В производстве',
//         'customer_company': 'Corp. Лебедев',
//         'end_date': '2 сентебря 2021',
//     },
//     {
//         'id': 2,
//         'order_name': 'Светофор 2',
//         'status': 'В производстве',
//         'customer_company': 'Corp. Лебедев',
//         'end_date': '2 сентебря 2021',
//     },
//     {
//         'id': 3,
//         'order_name': 'Светофор 3',
//         'status': 'В производстве',
//         'customer_company': 'Corp. Лебедев',
//         'end_date': '2 сентебря 2021',
//     },
// ]

function OrderPage(props) {


    const {section} = useParams()
    const navigate = useNavigate()

    const [isPageLoading, setIsPageLoading] = React.useState(true)
    const [isTableLoading, setIsTableLoading] = React.useState(true)
    const [selectedSection, setSelectedSection] = React.useState('')
    const [tableItems, setTableItems] = React.useState([])


    React.useEffect(() => {
        // if (section) {
        //     setSelectedSection(section)
        // }
        // setIsPageLoading(false)
    }, [])

    React.useEffect(() => {
        setIsTableLoading(true)
        getAllOrders().then(data => {
            setTableItems(data)
            setIsTableLoading(false)
            console.log(data)
        }).catch(err => {
            console.log("Error while getting data", err)
            setIsTableLoading(false)
        })
        setIsTableLoading(false)
    }, [selectedSection])

    const adminOptionsArray = [
        {
            type: adminOptions.user,
            text: 'Пользователи',
        },
        {
            type: adminOptions.specialty,
            text: 'Специальности',
        },
        {
            type: adminOptions.operation,
            text: 'Операции',
        },
        {
            type: adminOptions.material,
            text: 'Материалы',
        }
    ]


    return (
        <div className={'admin-page'}>
            {/*{!isPageLoading &&*/}
            {/*    <>*/}
            {/*        <SectionBar type={'admin'} sections={adminOptionsArray} selectedSection={selectedSection}*/}
            {/*                    onPress={(section) => {*/}
            {/*                        setSelectedSection(section)*/}
            {/*                        navigate(ADMIN_ROUTE + '/' + section)*/}
            {/*                    }}/>*/}
            {/*    </>*/}
            {/*}*/}
            <div className={'admin-page-container'}>
                {!isPageLoading &&
                    <>
                        <div className={'page-title'}>
                            Список заказов
                        </div>
                    </>
                }
                {isTableLoading &&
                    <div>
                        Loading...
                    </div>
                }
                {!isTableLoading &&
                    <AdminTable tableType={adminOptions.order} tableItems={tableItems}/>
                }
            </div>
        </div>
    );
}

export default OrderPage;