import React from 'react';
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import SearchField from "../searchField/searchField";
import {searchFieldProps} from "../searchField/searchFieldProps";
import {createOperation, updateOperation} from "../../http/operationApi";
import {pageMods} from "../../utils/consts";

function OperationEditor({operation = null, mod = pageMods.viewer}) {
    const [operationName, setOperationName] = React.useState(operation?.operation_name)
    const [operationDuration, setOperationDuration] = React.useState(operation?.duration)
    const [specsIdList, setSpecsIdList] = React.useState(operation?.specialty_list?.map(obj => obj.id))
    const [specsList, setSpecsList] = React.useState(operation?.specialty_list || [])
    const [resourcesList, setResourcesList] = React.useState(operation?.resource_list || [])

    const clickOnSave = async (e) => {
        e.preventDefault()
        if (mod === pageMods.editor) {
            makeUpdateRequest()
        }
        if (mod === pageMods.creator) {
            makeCreateRequest(e)
        }
    }

    const makeUpdateRequest = () => {
        updateOperation(
            operation?.id,
            operationName,
            operationDuration,
            resourcesList,
            specsIdList,
        ).then(data => {
            console.log(data)
            alert('Операция успешно обновлена.')
            window.location.reload()
        }).catch(err => {
            console.log(err)
            alert('Не удалось обновить операцию.')
        })
    }

    const makeCreateRequest = () => {
        createOperation(
            operationName,
            operationDuration,
            resourcesList,
            specsIdList,
        ).then(data => {
            console.log(data)
            alert('Операция успешно создана.')
        }).catch(err => {
            console.log(err)
            alert('Не удалось создать операцию.')
        })
    }

    const createResource = () => {
        return {
            "material_id": 0,
            "amount": 1,
        }
    }

    return (
        <form className={'editor-container'} onSubmit={(e) => clickOnSave(e)}>
            <div className={'editor-container-left'}>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Название операции
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'specialty_name'}
                           type={'text'}
                           value={operationName}
                           onChange={(e) => setOperationName(e.target.value)}
                    />
                </div>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Время выполнения
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'specialty_name'}
                           type={'number'}
                           value={operationDuration}
                           onChange={(e) => setOperationDuration(e.target.value)}
                    />
                </div>
                <Button text={'Сохранить'}
                        size={buttonProps.size.small}
                        color={buttonProps.color.light}
                        bgColor={buttonProps.background_color.dark_v1}
                        type={'submit'}
                />
            </div>
            <div className={'editor-container-right'}>
                <SearchField type={searchFieldProps.material} baseList={resourcesList}
                             onUpdate={(items) => setResourcesList(items)} backStruct={createResource()}/>
                <SearchField type={searchFieldProps.specialty} baseList={specsList}
                             onUpdate={(items) => setSpecsIdList(items)} listLimit={1}/>
            </div>
        </form>
    );
}

export default OperationEditor;