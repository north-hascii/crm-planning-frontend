import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getOperationById} from "../../http/operationApi";
import OperationEditor from "../../components/adminEditor/OperationEditor";
import MaterialEditor from "../../components/adminEditor/MaterialEditor";
import {getMaterialById} from "../../http/materialApi";

function MaterialEditorPage(props) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [material, setMaterial] = React.useState(null)
    const navigate = useNavigate()


    React.useEffect(() => {
        setIsLoading(true)
        getMaterialById(id).then(data => {
            setMaterial(data)
            setIsLoading(false)
        }).catch(err => {
            console.log("Error while getting data", err)
            setIsLoading(false)
        })
    }, [])

    if (isLoading && !material) {
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
                    Редактирование материала
                </div>
                <MaterialEditor material={material}/>
            </div>
        </div>
    );
}

export default MaterialEditorPage;