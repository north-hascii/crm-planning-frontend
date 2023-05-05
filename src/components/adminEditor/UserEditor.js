import React from 'react';
import './UserEditor.scss'
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import InputItems from "./InputItems";
import {useNavigate} from "react-router-dom";
import {getUserById, updateUser} from "../../http/userApi";
import {getAllSpecialties, getSpecialtiesByPartName} from "../../http/specialtyApi";
import {searchFieldProps} from "../searchField/searchFieldProps";
import SearchField from "../searchField/searchField";

function UserEditor({user}) {
    const [firstName, setFirstName] = React.useState(user.first_name)
    const [secondName, setSecondName] = React.useState(user.second_name)
    const [thirdName, setThirdName] = React.useState(user.third_name)
    const [email, setEmail] = React.useState(user.email)
    const [status, setStatus] = React.useState(user.status)
    const [specInSearch, setSpecInSearch] = React.useState('')

    const [isSpecInputValid, setIsSpecInputValid] = React.useState(true)

    const [isSpecialtyListVisible, setIsSpecialtyListVisible] = React.useState(false)

    const [specialtyList, setSpecialtyList] = React.useState(user.specialties ? user.specialties : [])
    const [specialtyIdList, setSpecialtyIdList] = React.useState(user.specialties ? user.specialties.map(obj => obj.id)  : [])
    const [availableSpecialtiesList, setAvailableSpecialtiesList] = React.useState([])

    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        setIsLoading(true)

    }, [])

    const makeUpdateRequest = async (e) => {
        e.preventDefault()
        updateUser(
            user.id,
            email,
            firstName,
            secondName,
            thirdName,
            user.user_role,
            status,
            specialtyIdList
        ).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }

    const clckOnSearchButton = () => {
        if (specInSearch.length > 0) {
            setIsSpecInputValid(true)
            makeSpecsSearch()
            return
        }
        setIsSpecInputValid(false)
    }

    const makeSpecsSearch = () => {
        getSpecialtiesByPartName(specInSearch).then(data => {
            setAvailableSpecialtiesList(data)
            setIsSpecialtyListVisible(true)
            setIsLoading(false)
        }).catch(err => {
            console.log("Error while getting data", err)
            setIsSpecialtyListVisible(true)
            setIsLoading(false)
        })
    }

    const statusKeyValue = [
        {
            name: 'working',
            text: 'Работает',
        },
        {
            name: 'on business trip',
            text: 'В командировке',
        },
        {
            name: 'on vocation',
            text: 'В отпуске',
        },
        {
            name: 'fired',
            text: 'Уволен',
        }
    ]

    return (
        <form className={'editor-container'} onSubmit={(e) => makeUpdateRequest(e)}>
            <div className={'editor-container-left'}>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Фамилия
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'second_name'}
                           type={'text'}
                           value={secondName}
                           onChange={(e) => setSecondName(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Имя
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'first_name'}
                           type={'text'}
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Отчество
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'third_name'}
                           type={'text'}
                           value={thirdName}
                           onChange={(e) => setThirdName(e.target.value)}
                    />
                </div>

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Почта
                    </div>
                    <input className={'editor-item-input'}
                           required
                           name={'email'}
                           type={'text'}
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Статус
                    </div>
                    <select defaultValue={status.toString()}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {statusKeyValue.map((item, index) => {
                            return (
                                <option value={item.name} key={index}>{item.text}</option>
                            )
                        })}
                    </select>
                </div>

                <Button text={'Сохранить'}
                        size={buttonProps.size.small}
                        color={buttonProps.color.light}
                        bgColor={buttonProps.background_color.dark_v1}
                        type={'submit'}
                />
            </div>
            <div className={'editor-container-right'}>
                <SearchField type={searchFieldProps.specialty} baseList={user.specialties} onUpdate={(items) => setSpecialtyIdList(items)}/>
            </div>
        </form>
    );
}

export default UserEditor;