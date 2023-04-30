import React from 'react';
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";
import './AdminEditorPage.scss'
import {useNavigate, useParams} from "react-router-dom";
import {getUserById} from "../../http/userApi";
import UserEditor from "../../components/userEditor/UserEditor";

function AdminEditorPage({}) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [user, setUser] = React.useState(null)
    const navigate = useNavigate()


    React.useEffect(() => {
        setIsLoading(true)
        getUserById(id).then(data => {
            // console.log(data)
            setUser(data)
            setIsLoading(false)
        }).catch(err => {
            console.log("Error while getting data", err)
            setIsLoading(false)
        })
    }, [])

    if (isLoading && !user) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <div className={'admin-page-edit'}>
            <div className={'admin-page-container'}>
                <div className={'page-title'}>
                    Редактирование пользователя
                </div>
                <UserEditor user={user}/>
            </div>
        </div>
    );
}

export default AdminEditorPage;