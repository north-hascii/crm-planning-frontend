import React from 'react';
import './AdminPage.scss'
import OptionsBar from "../../components/optionsBar/OptionsBar";
import AdminTable from "../../components/adminTable/adminTable";
import {adminOptions} from "./adminOptions";

function AdminPage(props) {
    const adminOptionsArray = [
        {
            type: adminOptions.users,
            text: 'Пользователи',
        },
        {
            type: adminOptions.specialties,
            text: 'Специальности',
        }
    ]

    const [selectedType, setSelectedType] = React.useState(adminOptionsArray[0].type)
    // const [selected]

    const table_col_names = {
        users: [
            'id',
            'ФИО',
            'Почта',
            'Специальность',
            'Роль',
            'Статус',
            '',
            // '',
        ],
        specialties: [
            '№ Должности',
            'Название',
            '',
            '',
            ''
        ]
    }

    const adminPageTitles = {
        users: 'Список пользователей',
        specialties: 'Список специальностей',
    }

    return (
        <div className={'admin-page'}>
            <OptionsBar type={'admin'} options={adminOptionsArray} markTab={(tab) => setSelectedType(tab)}/>
            <div className={'admin-page-container'}>
                <div className={'page-title'}>
                    {adminPageTitles[selectedType]}
                </div>
                <AdminTable table_type={selectedType} table_col_names={table_col_names[selectedType]}/>
            </div>
        </div>
    );
}

export default AdminPage;