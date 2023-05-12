import React from 'react';
import {updateSpecialty} from "../../http/specialtyApi";
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import SearchField from "../searchField/searchField";
import {searchFieldProps} from "../searchField/searchFieldProps";
import {createMaterial, updateMaterial} from "../../http/materialApi";
import {pageMods} from "../../utils/consts";
import {createUser} from "../../http/userApi";

function MaterialEditor({material, mod = pageMods.viewer}) {
    const [materialName, setMaterialName] = React.useState(material ? (material.material_name ? material.material_name : '') : '')
    const [materialUnits, setMaterialUnits] = React.useState(material ? (material.units ? material.units : '') : '')

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
        updateMaterial(
            material.id,
            materialName,
            materialUnits,
        ).then(data => {
            console.log(data)
            alert('Материал успешно обновлен.')
        }).catch(err => {
            console.log(err)
            alert('Не удалось обновить материал.')
        })
    }

    const makeCreateRequest = () => {
        createMaterial(
            materialName,
            materialUnits,
        ).then(data => {
            console.log(data)
            alert('Материал успешно создан.')
        }).catch(err => {
            console.log(err)
            alert('Не удалось создать материал.')
        })
    }

    return (
        <form className={'editor-container'} onSubmit={(e) => clickOnSave(e)}>
            <div className={'editor-container-left'}>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Название материала
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'specialty_name'}
                           type={'text'}
                           value={materialName}
                           onChange={(e) => setMaterialName(e.target.value)}
                    />
                </div>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Единицы измерения
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'specialty_name'}
                           type={'text'}
                           value={materialUnits}
                           onChange={(e) => setMaterialUnits(e.target.value)}
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

            </div>
        </form>
    );
}

export default MaterialEditor;