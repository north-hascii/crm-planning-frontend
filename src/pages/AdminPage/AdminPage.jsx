import React from 'react';
import './AdminPage.scss'
import OptionsBar from "../../components/optionsBar/OptionsBar";
import {getAllUsers} from "../../http/userApi";
import {AUTH_ROUTE, localStorageParams} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import AdminTable from "../../components/adminTable/adminTable";
import {getAllSpecialties} from "../../http/specialtyApi";

function AdminPage(props) {
    const adminOptions = [
        {
            name: 'users',
            text: 'Работники'
        },
        {
            name: 'roles',
            text: 'Должности',
        }
    ]

    const [selectedTab, setSelectedTab] = React.useState(adminOptions[0].name)

    return (
        <div className={'admin-page'}>
            <OptionsBar type={'admin'} options={adminOptions} markTab={(tab) => setSelectedTab(tab)}/>
            <AdminTable table_type={selectedTab}/>
        </div>
    );
}

export default AdminPage;