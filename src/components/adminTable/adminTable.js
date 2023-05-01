import React from 'react';
import './adminTable.scss'
import {adminOptions} from "../../pages/AdminPage/adminOptions";
import UserTable from "./UserTable";
import SpecialtyTable from "./SpecialtyTable";
import MaterialTable from "./MaterialTable";
import OperationTable from "./OperationTable";


function AdminTable(
    {
        tableType = '',
        tableItems = [],
    }) {

    return (
        <div className={'table-container'}>
            {tableType === adminOptions.user &&
                <UserTable tableItems={tableItems}/>
            }
            {tableType === adminOptions.specialty &&
                <SpecialtyTable tableItems={tableItems}/>
            }
            {tableType === adminOptions.operation &&
                <OperationTable tableItems={tableItems}/>
            }
            {tableType === adminOptions.material &&
                <MaterialTable tableItems={tableItems}/>
            }
        </div>
    );
}

export default AdminTable;