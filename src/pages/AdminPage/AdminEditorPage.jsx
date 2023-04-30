import React from 'react';
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";
import './AdminEditorPage.scss'
import {useNavigate, useParams} from "react-router-dom";
import {getUserById} from "../../http/userApi";

function AdminEditorPage({}) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [user, setUser] = React.useState(null)
    const navigate = useNavigate()


    React.useEffect(() => {
        setIsLoading(true)
        getUserById(id).then(data => {
            // console.log(data)
            setUser(data)
            setIsLoading(false)
        }).catch(err => {
            console.log("Error while getting data", err)
            setIsLoading(false)
        })
    }, [])

    if (isLoading && !user) {
        return (
            <div>
                Loading
            </div>
        )
    }

    const specialties = [
        'Фрезеровщик',
        'Сварщик'
    ]

    const roles = [
        'admin',
        'manager',
    ]

    return (
        <div className={'admin-page-edit'}>
            <div className={'admin-page-container'}>
                <div className={'page-title'}>
                    Редактирование пользователя
                </div>
                <div className={'editor-container'}>
                    <div className={'editor-container-left'}>
                        <div className={'editor-item'}>
                            <div className={'editor-item-text'}>
                                Фамилия
                            </div>
                            <input className={'editor-item-input'}
                                   required
                                   name={'second_name'}
                                   type={'text'}
                                   value={user.second_name}
                                   onChange={(e) => {}}
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
                                   value={user.first_name}
                                   onChange={(e) => {}}
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
                                   value={user.third_name}
                                   onChange={(e) => {}}
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
                                   value={user.email}
                                   onChange={(e) => {}}
                            />
                        </div>
                        <div className={'editor-item'}>
                            <div className={'editor-item-text'}>
                                Статус
                            </div>
                            <input className={'editor-item-input'}
                                   required
                                   name={'status'}
                                   type={'text'}
                                   value={user.status}
                                   onChange={(e) => {}}
                            />
                        </div>

                        <Button text={'Сохранить'}
                                size={buttonProps.size.small}
                                color={buttonProps.color.light}
                                bgColor={buttonProps.background_color.dark_v1}
                        />
                    </div>
                    <div className={'editor-container-right'}>
                        <div className={'editor-item'}>
                            <div className={'editor-item-text'}>
                                Специальность
                            </div>
                            <input className={'editor-item-input'}/>
                            <div className={'editor-selected-item-container'}>
                                {user.specialties && user.specialties.map((item, index) => {
                                    return (<div className={'editor-selected-item'} key={index}>
                                        {item}
                                        <svg className={'delete'} width="15" height="15" viewBox="0 0 15 15" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.38097 7.49963L12.3185 3.56838C12.4362 3.45069 12.5023 3.29107 12.5023 3.12463C12.5023 2.95819 12.4362 2.79857 12.3185 2.68088C12.2008 2.56319 12.0412 2.49707 11.8747 2.49707C11.7083 2.49707 11.5487 2.56319 11.431 2.68088L7.49972 6.61838L3.56847 2.68088C3.45078 2.56319 3.29116 2.49707 3.12472 2.49707C2.95828 2.49707 2.79866 2.56319 2.68097 2.68088C2.56328 2.79857 2.49716 2.95819 2.49716 3.12463C2.49716 3.29107 2.56328 3.45069 2.68097 3.56838L6.61847 7.49963L2.68097 11.4309C2.62239 11.489 2.57589 11.5581 2.54416 11.6343C2.51243 11.7104 2.49609 11.7921 2.49609 11.8746C2.49609 11.9571 2.51243 12.0388 2.54416 12.115C2.57589 12.1912 2.62239 12.2603 2.68097 12.3184C2.73907 12.377 2.8082 12.4235 2.88436 12.4552C2.96052 12.4869 3.04221 12.5033 3.12472 12.5033C3.20723 12.5033 3.28892 12.4869 3.36508 12.4552C3.44124 12.4235 3.51037 12.377 3.56847 12.3184L7.49972 8.38088L11.431 12.3184C11.4891 12.377 11.5582 12.4235 11.6344 12.4552C11.7105 12.4869 11.7922 12.5033 11.8747 12.5033C11.9572 12.5033 12.0389 12.4869 12.1151 12.4552C12.1912 12.4235 12.2604 12.377 12.3185 12.3184C12.377 12.2603 12.4235 12.1912 12.4553 12.115C12.487 12.0388 12.5033 11.9571 12.5033 11.8746C12.5033 11.7921 12.487 11.7104 12.4553 11.6343C12.4235 11.5581 12.377 11.489 12.3185 11.4309L8.38097 7.49963Z"
                                                fill="#4C4C4C"/>
                                        </svg>
                                    </div>)
                                })}

                            </div>
                        </div>
                        <div className={'editor-item'}>
                            <div className={'editor-item-text'}>
                                Роль
                            </div>
                            <input className={'editor-item-input'}/>
                            <div className={'editor-selected-item-container'}>
                                {roles.map((item, index) => {
                                    return (<div className={'editor-selected-item'} key={index}>
                                        {item}
                                        <svg className={'delete'} width="15" height="15" viewBox="0 0 15 15" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.38097 7.49963L12.3185 3.56838C12.4362 3.45069 12.5023 3.29107 12.5023 3.12463C12.5023 2.95819 12.4362 2.79857 12.3185 2.68088C12.2008 2.56319 12.0412 2.49707 11.8747 2.49707C11.7083 2.49707 11.5487 2.56319 11.431 2.68088L7.49972 6.61838L3.56847 2.68088C3.45078 2.56319 3.29116 2.49707 3.12472 2.49707C2.95828 2.49707 2.79866 2.56319 2.68097 2.68088C2.56328 2.79857 2.49716 2.95819 2.49716 3.12463C2.49716 3.29107 2.56328 3.45069 2.68097 3.56838L6.61847 7.49963L2.68097 11.4309C2.62239 11.489 2.57589 11.5581 2.54416 11.6343C2.51243 11.7104 2.49609 11.7921 2.49609 11.8746C2.49609 11.9571 2.51243 12.0388 2.54416 12.115C2.57589 12.1912 2.62239 12.2603 2.68097 12.3184C2.73907 12.377 2.8082 12.4235 2.88436 12.4552C2.96052 12.4869 3.04221 12.5033 3.12472 12.5033C3.20723 12.5033 3.28892 12.4869 3.36508 12.4552C3.44124 12.4235 3.51037 12.377 3.56847 12.3184L7.49972 8.38088L11.431 12.3184C11.4891 12.377 11.5582 12.4235 11.6344 12.4552C11.7105 12.4869 11.7922 12.5033 11.8747 12.5033C11.9572 12.5033 12.0389 12.4869 12.1151 12.4552C12.1912 12.4235 12.2604 12.377 12.3185 12.3184C12.377 12.2603 12.4235 12.1912 12.4553 12.115C12.487 12.0388 12.5033 11.9571 12.5033 11.8746C12.5033 11.7921 12.487 11.7104 12.4553 11.6343C12.4235 11.5581 12.377 11.489 12.3185 11.4309L8.38097 7.49963Z"
                                                fill="#4C4C4C"/>
                                        </svg>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminEditorPage;