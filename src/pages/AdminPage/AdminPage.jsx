import React from 'react';
import './AdminPage.scss'
import OptionsBar from "../../components/optionsBar/OptionsBar";
import AdminTable from "../../components/adminTable/adminTable";
import {adminOptions} from "./adminOptions";
import {ADMIN_ROUTE, ADMIN_SPECIALTY_ROUTE, ADMIN_USER_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

function AdminPage(props) {
    const adminSectionsAndTexts = {
        users: {
            type: adminOptions.users,
            text: 'Пользователи',
        },
        specialty: {
            type: adminOptions.specialties,
            text: 'Специальности',
        }
    }
    const [selectedType, setSelectedType] = React.useState('')

    const navigate = useNavigate()
    React.useEffect(() => {
        const route = window.location.pathname
        if (route === ADMIN_ROUTE) {
            navigate(ADMIN_USER_ROUTE)
        }
        if (route === ADMIN_USER_ROUTE) {
            // setSelectedType(adminOptionsArray.admin.type)
        }
        if (route === ADMIN_SPECIALTY_ROUTE) {
            // setSelectedType(adminOptionsArray.specialty.type)
        }
        console.log(route)
    }, [])


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

    const adminSections = Object.entries(adminSectionsAndTexts).map(([key, value]) => ({
        type: value.type,
        text: value.text,
    }));

    // const arr = [...adminSectionsAndTexts].map(([name, value]) => ({ name, value }))
    // Array.from(adminSectionsAndTexts, (item) => ({ item.type, item.text }))
    console.log(adminSections)
    return (
        <div className={'admin-page'}>
            <OptionsBar type={'admin'} options={adminSections} markTab={(tab) => setSelectedType(tab)}/>
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