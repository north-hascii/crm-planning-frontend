import React from 'react';
import './UserEditor.scss'
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import {createUser, updateUser, updateUserWithPassword} from "../../http/userApi";
import {searchFieldProps} from "../searchField/searchFieldProps";
import SearchField from "../searchField/searchField";
import {pageMods, userRoles, userStatuses} from "../../utils/consts";

function UserEditor({user = null, mod = pageMods.viewer}) {
    const [userId, setUserId] = React.useState(user?.id || -1)
    const [firstName, setFirstName] = React.useState(user?.first_name || '')
    const [secondName, setSecondName] = React.useState(user?.second_name || '')
    const [thirdName, setThirdName] = React.useState(user?.third_name || '')
    const [email, setEmail] = React.useState(user?.email || '')
    const [password, setPassword] = React.useState('')
    const [status, setStatus] = React.useState(user?.status || userStatuses.working)
    const [role, setRole] = React.useState(user?.user_role || userRoles.user)

    const [specialtyList, setSpecialtyList] = React.useState(user?.specialties || [])
    const [specialtyIdList, setSpecialtyIdList] = React.useState(user?.specialties?.map(obj => obj.id) || [])

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
                    {mod === pageMods.editor &&
                        <>
                            <br/>
                            * Оставить пустым, если не хотите менять пароль
                        </>
                    }
                </div>
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
                                <option value={item?.name} key={index}>{item?.text}</option>
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
}

export default UserEditor;