import React from 'react';
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";
import './AdminEditorPage.scss'
import {useNavigate, useParams} from "react-router-dom";
import {getUserById} from "../../http/userApi";
import UserEditor from "../../components/adminEditor/UserEditor";
import {pageMods} from "../../utils/consts";

function UserEditorPage({mod = pageMods.viewer}) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [user, setUser] = React.useState(null)


    React.useEffect(() => {
        if (mod === pageMods.editor) {
            getUserById(id).then(data => {
                setUser(data)
            }).catch(err => {
                console.log("Error while getting data", err)
                // alert('Не удалось получить данные пользователя.')
            }).finally(() => {
                setIsLoading(false)
            })
        }
        if (mod === pageMods.creator) {
            setIsLoading(false)
        }
    }, [])

    if (isLoading) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <div className={'admin-page-edit'}>
            <div className={'admin-page-container'}>
                <div className={'page-title-container'}>
                    <div className={'page-title'}>
                        {mod === pageMods.editor && 'Редактирование пользователя'}
                        {mod === pageMods.creator && 'Создание пользователя'}
                    </div>
                </div>
                <UserEditor user={user} mod={mod}/>
            </div>
        </div>
    );
}

export default UserEditorPage;