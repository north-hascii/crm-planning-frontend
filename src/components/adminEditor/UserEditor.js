import React from 'react';
import './UserEditor.scss'
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import InputItems from "./InputItems";
import {useNavigate} from "react-router-dom";
import {createUser, getUserById, updateUser, updateUserWithPassword} from "../../http/userApi";
import {getAllSpecialties, getSpecialtiesByPartName} from "../../http/specialtyApi";
import {searchFieldProps} from "../searchField/searchFieldProps";
import SearchField from "../searchField/searchField";
import {pageMods, userRoles, userStatuses} from "../../utils/consts";

function UserEditor({user, mod = pageMods.viewer}) {
    const [userId, setUserId] = React.useState(user ? user.id : -1)
    const [firstName, setFirstName] = React.useState(user ? user.first_name : '')
    const [secondName, setSecondName] = React.useState(user ? user.second_name : '')
    const [thirdName, setThirdName] = React.useState(user ? user.third_name : '')
    const [email, setEmail] = React.useState(user ? user.email : '')
    const [password, setPassword] = React.useState('')
    const [status, setStatus] = React.useState(user ? user.status : userStatuses.working)
    const [role, setRole] = React.useState(user ? user.user_role : userRoles.user)
    const [specInSearch, setSpecInSearch] = React.useState('')

    const [isSpecInputValid, setIsSpecInputValid] = React.useState(true)

    const [isSpecialtyListVisible, setIsSpecialtyListVisible] = React.useState(false)

    const [specialtyList, setSpecialtyList] = React.useState(user ? (user.specialties ? user.specialties : []) : [])
    const [specialtyIdList, setSpecialtyIdList] = React.useState(user ? (user.specialties ? user.specialties.map(obj => obj.id) : []) : [])
    const [availableSpecialtiesList, setAvailableSpecialtiesList] = React.useState([])

    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        setIsLoading(true)
    }, [])

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
        if (password.length === 0) {
            updateUser(
                userId,
                email,
                firstName,
                secondName,
                thirdName,
                role,
                status,
                specialtyIdList
            ).then(data => {
                console.log(data)
                alert('Пользователь успешно обновлен.')
                window.location.reload()
            }).catch(err => {
                console.log(err)
                alert('Не удалось обновить пользователя.')
            })
        } else {
            updateUserWithPassword(userId,
                email,
                password,
                firstName,
                secondName,
                thirdName,
                role,
                status,
                specialtyIdList
            ).then(data => {
                console.log(data)
                alert('Пользователь успешно обновлен.')
                window.location.reload()
            }).catch(err => {
                console.log(err)
                alert('Не удалось обновить пользователя.')
            })
        }

    }

    const makeCreateRequest = () => {
        createUser(
            email,
            password,
            firstName,
            secondName,
            thirdName,
            role,
            status,
            specialtyIdList
        ).then(data => {
            console.log(data)
            alert('Пользователь успешно создан.')
        }).catch(err => {
            console.log(err)
            alert('Не удалось создать пользователя.')
        })
    }

    // const clckOnSearchButton = () => {
    //     if (specInSearch.length > 0) {
    //         setIsSpecInputValid(true)
    //         makeSpecsSearch()
    //         return
    //     }
    //     setIsSpecInputValid(false)
    // }
    //
    // const makeSpecsSearch = () => {
    //     getSpecialtiesByPartName(specInSearch).then(data => {
    //         setAvailableSpecialtiesList(data)
    //         setIsSpecialtyListVisible(true)
    //         setIsLoading(false)
    //     }).catch(err => {
    //         console.log("Error while getting data", err)
    //         setIsSpecialtyListVisible(true)
    //         setIsLoading(false)
    //     })
    // }

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

    const roleKeyValue = [
        'admin',
        'manager',
        'worker',
        'user',
    ]

    return (
        <form className={'editor-container'} onSubmit={(e) => clickOnSave(e)}>
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
                           type={'email'}
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/*{mod === pageMods.creator*/}
                {/*    && <>*/}
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Пароль
                    </div>
                    <input className={'editor-item-input'}
                           required={mod === pageMods.creator}
                           name={'password'}
                           type={'text'}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/>
                    * Оставить пустым, если не хотите менять пароль
                </div>


                {/*    </>*/}
                {/*}*/}

                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Роль
                    </div>
                    <select defaultValue={role.toString()}
                            onChange={(e) => setRole(e.target.value)}
                    >
                        {roleKeyValue.map((item, index) => {
                            return (
                                <option value={item} key={index}>{item}</option>
                            )
                        })}
                    </select>
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
                <SearchField type={searchFieldProps.specialty} baseList={specialtyList}
                             onUpdate={(items) => setSpecialtyIdList(items)}/>
            </div>
        </form>
    )
        ;
}

export default UserEditor;