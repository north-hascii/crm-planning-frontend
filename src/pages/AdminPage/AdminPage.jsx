import React from 'react';
import './AdminPage.scss'
import OptionsBar from "../../components/optionsBar/OptionsBar";
import AdminTable from "../../components/adminTable/adminTable";
import {adminOptions} from "./adminOptions";

function AdminPage(props) {
    const adminOptionsArray = [
        {
            name: adminOptions.users,
            text: 'Пользователи',
        },
        {
            name: adminOptions.specialties,
            text: 'Специальности',
        }
    ]

    const [selectedTab, setSelectedTab] = React.useState(adminOptionsArray[0].name)

    const table_col_names = {
        users: [
            '№ Работника',
            'ФИО',
            'Почта',
            'Должности',
            'Статус',
            '',
            '',
        ],
        specialties: [
            '№ Должности',
            'Название',
            '',
            '',
            ''
        ]
    }

    return (
        <div className={'admin-page'}>
            <OptionsBar type={'admin'} options={adminOptionsArray} markTab={(tab) => setSelectedTab(tab)}/>
            <AdminTable table_type={selectedTab} table_col_names={table_col_names}/>
        </div>
    );
}

export default AdminPage;