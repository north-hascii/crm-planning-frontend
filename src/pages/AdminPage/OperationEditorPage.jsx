import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getSpecialtyById} from "../../http/specialtyApi";
import SpecialtyEditor from "../../components/adminEditor/SpecialtyEditor";
import OperationEditor from "../../components/adminEditor/OperationEditor";
import {getOperationById} from "../../http/operationApi";

function OperationEditorPage(props) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [operation, setOperation] = React.useState(null)
    const navigate = useNavigate()


    React.useEffect(() => {
        setIsLoading(true)
        getOperationById(id).then(data => {
            setOperation(data)
            setIsLoading(false)
        }).catch(err => {
            console.log("Error while getting data", err)
            setIsLoading(false)
        })
    }, [])

    if (isLoading && !operation) {
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
                    Редактирование операции
                </div>
                <OperationEditor operation={operation}/>
            </div>
        </div>
    );
}

export default OperationEditorPage;