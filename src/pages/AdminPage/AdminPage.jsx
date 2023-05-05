import React from 'react';
import './AdminPage.scss'
import SectionBar from "../../components/optionsBar/SectionBar";
import AdminTable from "../../components/adminTable/adminTable";
import {adminOptions} from "./adminOptions";
import {ADMIN_ROUTE} from "../../utils/consts";
import {useNavigate, useParams} from "react-router-dom";
import {getAllUsers} from "../../http/userApi";
import {getAllSpecialties} from "../../http/specialtyApi";
import {getAllMaterials} from "../../http/materialApi";
import {getAllSOperations} from "../../http/operationApi";

function AdminPage(props) {
    const {section} = useParams()
    const navigate = useNavigate()

    const [isPageLoading, setIsPageLoading] = React.useState(true)
    const [isTableLoading, setIsTableLoading] = React.useState(true)
    const [selectedSection, setSelectedSection] = React.useState('')
    const [tableItems, setTableItems] = React.useState([])


    React.useEffect(() => {
        if (section) {
            setSelectedSection(section)
        }
        setIsPageLoading(false)
    }, [])

    React.useEffect(() => {
        setIsTableLoading(true)
        if (section) {
            setSelectedSection(section)
        }

        if (section === adminOptions.user) {
            getAllUsers().then(data => {
                setTableItems(data)
                setIsTableLoading(false)
            }).catch(err => {
                console.log("Error while getting data", err)
                setIsTableLoading(false)
            })
        }
        if (section === adminOptions.specialty) {
            getAllSpecialties().then(data => {
                setTableItems(data)
                setIsTableLoading(false)
            }).catch(err => {
                console.log("Error while getting data", err)
                setIsTableLoading(false)
            })
        }
        if (section === adminOptions.operation) {
            getAllSOperations().then(data => {
                setTableItems(data)
                setIsTableLoading(false)
            }).catch(err => {
                console.log("Error while getting data", err)
                setIsTableLoading(false)
            })
        }
        if (section === adminOptions.material) {
            getAllMaterials().then(data => {
                setTableItems(data)
                setIsTableLoading(false)
            }).catch(err => {
                console.log("Error while getting data", err)
                setIsTableLoading(false)
            })
        }
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

    const adminPageTitles = {
        user: 'Список пользователей',
        specialty: 'Список специальностей',
        operation: 'Список операций',
        material: 'Список материалов',
    }


    return (
        <div className={'admin-page'}>
            {!isPageLoading &&
                <>
                    <SectionBar type={'admin'} sections={adminOptionsArray} selectedSection={selectedSection}
                                onPress={(section) => {
                                    setSelectedSection(section)
                                    navigate(ADMIN_ROUTE + '/' + section)
                                }}/>
                </>
            }
            <div className={'admin-page-container'}>
                {!isPageLoading &&
                    <>
                        <div className={'page-title'}>
                            {adminPageTitles[selectedSection]}
                        </div>
                    </>
                }
                {isTableLoading &&
                    <div>
                        Loading...
                    </div>
                }
                {!isTableLoading &&
                    <AdminTable tableType={selectedSection} tableItems={tableItems}/>
                }
            </div>
        </div>
    );
}

export default AdminPage;