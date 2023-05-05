import React from 'react';
import {updateSpecialty} from "../../http/specialtyApi";
import {getAllUsersByPartSecondName} from "../../http/userApi";
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import SearchField from "../searchField/searchField";
import {searchFieldProps} from "../searchField/searchFieldProps";
import {updateOperation} from "../../http/operationApi";

function OperationEditor({operation}) {
    const [specName, setSpecName] = React.useState(operation.specialty_name)
    const [specsIdList, setSpecsIdList] = React.useState(operation.specialty_list ? operation.specialty_list.map(obj => obj.id) : [])
    const [resourcesList, setResourcesList] = React.useState(operation.resource_list ? operation.resource_list.map(obj => {
        return {
            "material_id": obj.material.id,
            "amount": obj.amount,
        }
    }) : [])

    const makeUpdateRequest = async (e) => {
        e.preventDefault()
        console.log('editor res list:', resourcesList)
        console.log('editor specs list:', specsIdList)
        updateOperation(
            operation.id,
            operation.operation_name,
            operation.duration,
            resourcesList,
            specsIdList,
        ).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }

    const createResource = () => {
        return {
            "material_id": 0,
            "amount": 1,
        }
    }

    return (
        <form className={'editor-container'} onSubmit={(e) => makeUpdateRequest(e)}>
            <div className={'editor-container-left'}>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Название операции
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'specialty_name'}
                           type={'text'}
                           value={specName}
                           onChange={(e) => setSpecName(e.target.value)}
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
                           value={specName}
                           onChange={(e) => setSpecName(e.target.value)}
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
                <SearchField type={searchFieldProps.material} baseList={operation.resource_list}
                             onUpdate={(items) => setResourcesList(items)} backStruct={createResource()}/>
                <SearchField type={searchFieldProps.specialty} baseList={operation.specialty_list}
                             onUpdate={(items) => setSpecsIdList(items)}/>
            </div>
        </form>
    );
}

export default OperationEditor;