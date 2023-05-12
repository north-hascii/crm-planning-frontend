import React, {useContext} from 'react';
import './AdminPage.scss'
import AdminSectionBar from "../../components/optionsBar/AdminSectionBar";
import AdminTable from "../../components/adminTable/adminTable";
import {adminOptions} from "./adminOptions";
import {adminSections, adminSectionsArray, appRoutes, userRoles} from "../../utils/consts";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getAllUsers} from "../../http/userApi";
import {getAllSpecialties} from "../../http/specialtyApi";
import {getAllMaterials} from "../../http/materialApi";
import {getAllSOperations} from "../../http/operationApi";
import {buttonProps} from "../../components/Button/ButtonProps";
import Button from "../../components/Button/Button";
import {StoreContext} from "../../index";

function AdminPage(props) {
    const {user} = useContext(StoreContext)

    const {section} = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const [isPageLoading, setIsPageLoading] = React.useState(true)
    const [isTableLoading, setIsTableLoading] = React.useState(true)
    const [selectedSection, setSelectedSection] = React.useState('')
    const [tableItems, setTableItems] = React.useState([])


    React.useEffect(() => {
        if (section) {
            setSelectedSection(section)
        }
        setIsPageLoading(false)
    }, [location])

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

    // const adminOptionsArray = [
    //     {
    //         type: adminOptions.user,
    //         text: 'Пользователи',
    //     },
    //     {
    //         type: adminOptions.specialty,
    //         text: 'Специальности',
    //     },
    //     {
    //         type: adminOptions.operation,
    //         text: 'Операции',
    //     },
    //     {
    //         type: adminOptions.material,
    //         text: 'Материалы',
    //     }
    // ]
    //
    // const adminPageTitles = {
    //     user: 'Список пользователей',
    //     specialty: 'Список специальностей',
    //     operation: 'Список операций',
    //     material: 'Список материалов',
    // }


    return (
        <div className={'admin-page'}>
            {!isPageLoading &&
                <>
                    <AdminSectionBar type={'admin'} sections={adminSectionsArray} selectedSection={selectedSection}
                                     onPress={(section) => {
                                    setSelectedSection(section)
                                    navigate(appRoutes.admin.ADMIN_ROUTE + '/' + section)
                                }}/>
                </>
            }
            <div className={'admin-page-container'}>
                {!isPageLoading &&
                    <div className={'page-title-container'}>
                        <div className={'page-title'}>
                            {adminSections[selectedSection].title}
                        </div>
                        {((user.userRole === userRoles.manager && selectedSection !== adminSections.user.section) ||
                            (user.userRole === userRoles.admin))&&
                            <Button text={'Создать'}
                                    size={buttonProps.size.small}
                                    color={buttonProps.color.light}
                                    bgColor={buttonProps.background_color.dark_v1}
                                    onClck={() => {
                                        navigate(appRoutes.admin.ADMIN_ROUTE + '/' + section + '/' + 'create')
                                    }}
                            />
                        }
                    </div>
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