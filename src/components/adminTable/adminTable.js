import React from 'react';
import './adminTable.scss'
import {getAllUsers} from "../../http/userApi";
import {getAllSpecialties} from "../../http/specialtyApi";


function AdminTable({table_type = ''}) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [items, setItems] = React.useState([])

    React.useEffect(() => {
        setIsLoading(true)
        if (table_type === 'users') {
            getAllUsers().then(data => {
                setItems(data)
                // setTimeout(() => {
                //     setIsLoading(false)
                // }, 1000)

                // console.log(data)
            }).catch(err => {
                console.log("Error while getting data", err)
            })
        }
        if (table_type === 'roles') {
            getAllSpecialties().then(data => {
                setItems(data)
                // setTimeout(() => {
                //     setIsLoading(false)
                // }, 1000)

                // console.log(data)
            }).catch(err => {
                console.log("Error while getting data", err)
            })
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    }, [table_type])

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
        roles: [
            '№ Должности',
            'Название',
            '',
            '',
            ''
        ]
    }
    if (isLoading) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <table className={`admin-table ${table_type}`}>
            <tbody>
            <tr className={'admin-table-col-names'}>
                {table_col_names[table_type].map((name, index) => {
                    return (
                        <th key={index}>
                            {name}
                        </th>
                    )
                })}
            </tr>
            {table_type === 'users' &&
                items.map((item, index) => {
                    return (<tr key={index}>
                        <th>
                            {item.id}
                        </th>
                        <th>
                            {item.first_name + ' ' + item.second_name + ' ' + item.third_name}
                        </th>
                        <th>
                            {item.email}
                        </th>
                        <th>
                            {[item.specialties].join()}
                        </th>
                        <th>
                            {item.status}
                        </th>
                        <th>
                            Редактировать
                        </th>
                        <th>
                            Удалить
                        </th>
                    </tr>)
                })
            }

            {table_type === 'roles' &&
                items.map((item, index) => {
                    return (<tr key={index}>
                        <th>
                            {item.id}
                        </th>
                        <th>
                            {item.specialty_name}
                        </th>
                        <th>
                            Список работников
                        </th>
                        <th>
                            Редактировать
                        </th>
                        <th>
                            Удалить
                        </th>
                    </tr>)
                })
            }
            </tbody>
        </table>
    );
}

export default AdminTable;