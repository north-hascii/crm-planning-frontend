import React from 'react';
import {createSpecialty, updateSpecialty} from "../../http/specialtyApi";
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import SearchField from "../searchField/searchField";
import {searchFieldProps} from "../searchField/searchFieldProps";
import {pageMods} from "../../utils/consts";

function SpecialtyEditor({specialty = null, mod = pageMods.viewer}) {
    const [specName, setSpecName] = React.useState(specialty?.specialty_name)

    const [usersList, setUsersList] = React.useState(specialty?.specialty_users || [])
    const [usersIdList, setUsersIdList] = React.useState(specialty?.specialty_users?.map(obj => obj.id) || [])

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
        updateSpecialty(
            specialty?.id,
            specName,
            usersIdList
        ).then(data => {
            console.log(data)
            alert('Специальность успешно обновлена.')
            window.location.reload()
        }).catch(err => {
            console.log(err)
            alert('Не удалось обновить специальность.')
        })
    }

    const makeCreateRequest = () => {
        createSpecialty(
            specName,
            usersIdList
        ).then(data => {
            console.log(data)
            alert('Специальность успешно создана.')
        }).catch(err => {
            console.log(err)
            alert('Не удалось создать специальность.')
        })
    }

    return (
        <form className={'editor-container'} onSubmit={(e) => clickOnSave(e)}>
            <div className={'editor-container-left'}>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Название специальности
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'specialty_name'}
                           type={'text'}
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
                <SearchField type={searchFieldProps.user} baseList={usersList} onUpdate={(items) => setUsersIdList(items)}/>
            </div>
        </form>
    );
}

export default SpecialtyEditor;