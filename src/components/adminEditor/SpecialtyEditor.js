import React from 'react';
import {updateSpecialty} from "../../http/specialtyApi";
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import SearchField from "../searchField/searchField";
import {searchFieldProps} from "../searchField/searchFieldProps";

function SpecialtyEditor({specialty}) {
    const [specName, setSpecName] = React.useState(specialty.specialty_name)

    const [usersIdList, setUsersIdList] = React.useState(specialty.specialty_users ? specialty.specialty_users.map(obj => obj.id) : [])

    const makeUpdateRequest = async (e) => {
        e.preventDefault()
        updateSpecialty(
            specialty.id,
            specName,
            usersIdList
        ).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <form className={'editor-container'} onSubmit={(e) => makeUpdateRequest(e)}>
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
                <SearchField type={searchFieldProps.user} baseList={specialty.specialty_users} onUpdate={(items) => setUsersIdList(items)}/>
            </div>
        </form>
    );
}

export default SpecialtyEditor;