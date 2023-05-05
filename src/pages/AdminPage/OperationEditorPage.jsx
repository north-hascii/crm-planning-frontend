import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getSpecialtyById} from "../../http/specialtyApi";
import SpecialtyEditor from "../../components/adminEditor/SpecialtyEditor";
import OperationEditor from "../../components/adminEditor/OperationEditor";
import {getOperationById} from "../../http/operationApi";
import {pageMods} from "../../utils/consts";
import {getMaterialById} from "../../http/materialApi";

function OperationEditorPage({mod = pageMods.viewer}) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [operation, setOperation] = React.useState(null)

    React.useEffect(() => {
        if (mod === pageMods.editor) {
            getOperationById(id).then(data => {
                setOperation(data)
            }).catch(err => {
                console.log("Error while getting data", err)
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
                        {mod === pageMods.editor && 'Редактирование операции'}
                        {mod === pageMods.creator && 'Создание операции'}
                    </div>
                </div>

                <OperationEditor operation={operation} mod={mod}/>
            </div>
        </div>
    );
}

export default OperationEditorPage;