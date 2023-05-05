import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getUserById} from "../../http/userApi";
import UserEditor from "../../components/adminEditor/UserEditor";
import SpecialtyEditor from "../../components/adminEditor/SpecialtyEditor";
import {getSpecialtyById, getSpecialtiesByPartName} from "../../http/specialtyApi";

function SpecialtyEditorPage(props) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [specialty, setSpecialty] = React.useState(null)
    const navigate = useNavigate()


    React.useEffect(() => {
        setIsLoading(true)
        getSpecialtyById(id).then(data => {
            setSpecialty(data)
            setIsLoading(false)
        }).catch(err => {
            console.log("Error while getting data", err)
            setIsLoading(false)
        })
    }, [])

    if (isLoading && !specialty) {
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
                    Редактирование специальности
                </div>
                <SpecialtyEditor specialty={specialty}/>
            </div>
        </div>
    );
}

export default SpecialtyEditorPage;