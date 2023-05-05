import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import MaterialEditor from "../../components/adminEditor/MaterialEditor";
import {getMaterialById} from "../../http/materialApi";
import {pageMods} from "../../utils/consts";
import {getUserById} from "../../http/userApi";

function MaterialEditorPage({mod = pageMods.viewer}) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [material, setMaterial] = React.useState(null)

    React.useEffect(() => {
        if (mod === pageMods.editor) {
            getMaterialById(id).then(data => {
                setMaterial(data)
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
                        {mod === pageMods.editor && 'Редактирование материала'}
                        {mod === pageMods.creator && 'Создание материала'}
                    </div>
                </div>
                <MaterialEditor material={material} mod={mod}/>
            </div>
        </div>
    );
}

export default MaterialEditorPage;