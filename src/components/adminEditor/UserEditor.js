import React from 'react';
import './UserEditor.scss'
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import InputItems from "./InputItems";
import {useNavigate} from "react-router-dom";
import {getUserById, updateUser} from "../../http/userApi";
import {getAllSpecialties, getSpecialtiesByPartName} from "../../http/specialtyApi";

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
                <div className={'editor-item'}>
                    <div className={'editor-item-text'}>
                        Специальность
                    </div>
                    <div className={'editor-search-item'}>
                        {/*<form className={'auth-form-container'} >*/}
                        <div className={'input-search-container'} onSubmit={(e) => makeSpecsSearch(e)}>
                            <input className={'editor-item-input'}
                                   name={'specialty_name'}
                                   type={'text'}
                                   value={specInSearch}
                                   onChange={(e) => setSpecInSearch(e.target.value)}
                            />

                            <svg className={`input-search-hide ${isSpecialtyListVisible ? 'visible' : 'hidden'}`}
                                 onClick={() => setIsSpecialtyListVisible(false)}
                                 width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.5916 10.4499C10.5142 10.3718 10.422 10.3098 10.3205 10.2675C10.2189 10.2252 10.11 10.2035 9.99998 10.2035C9.88997 10.2035 9.78105 10.2252 9.6795 10.2675C9.57795 10.3098 9.48578 10.3718 9.40831 10.4499L6.90831 12.9499C6.74697 13.1069 6.65457 13.3215 6.65145 13.5465C6.64832 13.7715 6.73472 13.9886 6.89164 14.1499C7.04856 14.3113 7.26315 14.4037 7.48819 14.4068C7.71324 14.4099 7.9303 14.3235 8.09164 14.1666L9.99998 12.2166L11.9083 14.1666C11.9858 14.2447 12.0779 14.3067 12.1795 14.349C12.281 14.3913 12.39 14.4131 12.5 14.4131C12.61 14.4131 12.7189 14.3913 12.8205 14.349C12.922 14.3067 13.0142 14.2447 13.0916 14.1666C13.1698 14.0891 13.2317 13.997 13.2741 13.8954C13.3164 13.7939 13.3381 13.685 13.3381 13.5749C13.3381 13.4649 13.3164 13.356 13.2741 13.2545C13.2317 13.1529 13.1698 13.0608 13.0916 12.9833L10.5916 10.4499ZM8.09164 9.54995L9.99998 7.63328L11.9083 9.54995C11.9858 9.62806 12.0779 9.69005 12.1795 9.73236C12.281 9.77467 12.39 9.79645 12.5 9.79645C12.61 9.79645 12.7189 9.77467 12.8205 9.73236C12.922 9.69005 13.0142 9.62806 13.0916 9.54995C13.1698 9.47248 13.2317 9.38031 13.2741 9.27876C13.3164 9.17721 13.3381 9.06829 13.3381 8.95828C13.3381 8.84827 13.3164 8.73935 13.2741 8.6378C13.2317 8.53625 13.1698 8.44408 13.0916 8.36662L10.5916 5.86662C10.5142 5.78851 10.422 5.72651 10.3205 5.68421C10.2189 5.6419 10.11 5.62012 9.99998 5.62012C9.88997 5.62012 9.78105 5.6419 9.6795 5.68421C9.57795 5.72651 9.48578 5.78851 9.40831 5.86662L6.90831 8.36662C6.75139 8.52354 6.66323 8.73636 6.66323 8.95828C6.66323 9.1802 6.75139 9.39303 6.90831 9.54995C7.06523 9.70687 7.27806 9.79502 7.49998 9.79502C7.7219 9.79502 7.93472 9.70687 8.09164 9.54995V9.54995Z"
                                    fill="#4C4C4C" fillOpacity="0.5"/>
                            </svg>
                            {/*<button  type={'submit'}>*/}
                            <svg className={'input-search-button'} type={'submit'}
                                 onClick={() => clckOnSearchButton()}
                                 width="15" height="15" viewBox="0 0 15 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.5691 12.6816L11.2504 10.3816C12.1504 9.25937 12.5863 7.83493 12.4684 6.40118C12.3504 4.96743 11.6877 3.63336 10.6163 2.67327C9.54497 1.71318 8.1465 1.20006 6.70844 1.23941C5.27039 1.27876 3.90207 1.86759 2.88483 2.88483C1.86759 3.90207 1.27876 5.27039 1.23941 6.70844C1.20006 8.1465 1.71318 9.54497 2.67327 10.6163C3.63336 11.6877 4.96743 12.3504 6.40118 12.4684C7.83493 12.5863 9.25937 12.1504 10.3816 11.2504L12.6816 13.5504C12.7397 13.6089 12.8088 13.6554 12.885 13.6872C12.9612 13.7189 13.0429 13.7352 13.1254 13.7352C13.2079 13.7352 13.2896 13.7189 13.3657 13.6872C13.4419 13.6554 13.511 13.6089 13.5691 13.5504C13.6818 13.4338 13.7447 13.2781 13.7447 13.116C13.7447 12.9539 13.6818 12.7982 13.5691 12.6816ZM6.87537 11.2504C6.01007 11.2504 5.16421 10.9938 4.44475 10.513C3.72528 10.0323 3.16453 9.34903 2.83339 8.54961C2.50226 7.75018 2.41562 6.87051 2.58443 6.02185C2.75324 5.17318 3.16992 4.39363 3.78178 3.78178C4.39363 3.16992 5.17318 2.75324 6.02185 2.58443C6.87051 2.41562 7.75018 2.50226 8.54961 2.83339C9.34903 3.16453 10.0323 3.72528 10.513 4.44475C10.9938 5.16421 11.2504 6.01007 11.2504 6.87537C11.2504 8.03569 10.7894 9.14849 9.96896 9.96896C9.14849 10.7894 8.03569 11.2504 6.87537 11.2504Z"
                                    fill="#4C4C4C" fillOpacity="0.5"/>
                            </svg>
                            {/*Search*/}
                            {/*</button>*/}
                        </div>
                        <div className={`input-error ${isSpecInputValid > 0 ? 'hidden' : 'visible'}`}>
                            Поле не заполнено
                        </div>
                        <div className={`search-result-container ${isSpecialtyListVisible ? 'visible' : 'hidden'}`}>
                            {availableSpecialtiesList && availableSpecialtiesList.length > 0 ? availableSpecialtiesList.map((item, index) => {
                                    return (
                                        <div className={'search-result enable'} key={index} onClick={() => {
                                            setIsSpecialtyListVisible(false)
                                            if (!specialtyIdList.includes(item.id)) {
                                                setSpecialtyList(specialtyList => [...specialtyList, item])
                                                setSpecialtyIdList(specialtyList => [...specialtyIdList, item.id])
                                            }
                                        }}>
                                            {item.specialty_name}
                                        </div>
                                    )
                                })
                                :
                                <div className={`search-result`}>
                                    Поиск не дал результатов
                                </div>
                            }
                        </div>
                    </div>
                    <div className={'editor-selected-item-container'}>
                        {specialtyList && specialtyList.map((item, index) => {
                            return (<div className={'editor-selected-item'} key={index}>
                                {item.specialty_name}
                                <svg className={'delete'} onClick={() => {
                                    setSpecialtyList(specialtyList.filter(itemTmp => itemTmp !== item));
                                    setSpecialtyIdList(specialtyIdList.filter(id => id !== item.id));
                                }}
                                     width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.38097 7.49963L12.3185 3.56838C12.4362 3.45069 12.5023 3.29107 12.5023 3.12463C12.5023 2.95819 12.4362 2.79857 12.3185 2.68088C12.2008 2.56319 12.0412 2.49707 11.8747 2.49707C11.7083 2.49707 11.5487 2.56319 11.431 2.68088L7.49972 6.61838L3.56847 2.68088C3.45078 2.56319 3.29116 2.49707 3.12472 2.49707C2.95828 2.49707 2.79866 2.56319 2.68097 2.68088C2.56328 2.79857 2.49716 2.95819 2.49716 3.12463C2.49716 3.29107 2.56328 3.45069 2.68097 3.56838L6.61847 7.49963L2.68097 11.4309C2.62239 11.489 2.57589 11.5581 2.54416 11.6343C2.51243 11.7104 2.49609 11.7921 2.49609 11.8746C2.49609 11.9571 2.51243 12.0388 2.54416 12.115C2.57589 12.1912 2.62239 12.2603 2.68097 12.3184C2.73907 12.377 2.8082 12.4235 2.88436 12.4552C2.96052 12.4869 3.04221 12.5033 3.12472 12.5033C3.20723 12.5033 3.28892 12.4869 3.36508 12.4552C3.44124 12.4235 3.51037 12.377 3.56847 12.3184L7.49972 8.38088L11.431 12.3184C11.4891 12.377 11.5582 12.4235 11.6344 12.4552C11.7105 12.4869 11.7922 12.5033 11.8747 12.5033C11.9572 12.5033 12.0389 12.4869 12.1151 12.4552C12.1912 12.4235 12.2604 12.377 12.3185 12.3184C12.377 12.2603 12.4235 12.1912 12.4553 12.115C12.487 12.0388 12.5033 11.9571 12.5033 11.8746C12.5033 11.7921 12.487 11.7104 12.4553 11.6343C12.4235 11.5581 12.377 11.489 12.3185 11.4309L8.38097 7.49963Z"
                                        fill="#4C4C4C"/>
                                </svg>
                            </div>)
                        })}
                    </div>
                </div>
                {/*<div className={'editor-item'}>*/}
                {/*    <div className={'editor-item-text'}>*/}
                {/*        Роль*/}
                {/*    </div>*/}
                {/*    <input className={'editor-item-input'}/>*/}
                {/*    <div className={'editor-selected-item-container'}>*/}
                {/*        {roles.map((item, index) => {*/}
                {/*            return (<div className={'editor-selected-item'} key={index}>*/}
                {/*                {item}*/}
                {/*                <svg className={'delete'} width="15" height="15" viewBox="0 0 15 15" fill="none"*/}
                {/*                     xmlns="http://www.w3.org/2000/svg">*/}
                {/*                    <path*/}
                {/*                        d="M8.38097 7.49963L12.3185 3.56838C12.4362 3.45069 12.5023 3.29107 12.5023 3.12463C12.5023 2.95819 12.4362 2.79857 12.3185 2.68088C12.2008 2.56319 12.0412 2.49707 11.8747 2.49707C11.7083 2.49707 11.5487 2.56319 11.431 2.68088L7.49972 6.61838L3.56847 2.68088C3.45078 2.56319 3.29116 2.49707 3.12472 2.49707C2.95828 2.49707 2.79866 2.56319 2.68097 2.68088C2.56328 2.79857 2.49716 2.95819 2.49716 3.12463C2.49716 3.29107 2.56328 3.45069 2.68097 3.56838L6.61847 7.49963L2.68097 11.4309C2.62239 11.489 2.57589 11.5581 2.54416 11.6343C2.51243 11.7104 2.49609 11.7921 2.49609 11.8746C2.49609 11.9571 2.51243 12.0388 2.54416 12.115C2.57589 12.1912 2.62239 12.2603 2.68097 12.3184C2.73907 12.377 2.8082 12.4235 2.88436 12.4552C2.96052 12.4869 3.04221 12.5033 3.12472 12.5033C3.20723 12.5033 3.28892 12.4869 3.36508 12.4552C3.44124 12.4235 3.51037 12.377 3.56847 12.3184L7.49972 8.38088L11.431 12.3184C11.4891 12.377 11.5582 12.4235 11.6344 12.4552C11.7105 12.4869 11.7922 12.5033 11.8747 12.5033C11.9572 12.5033 12.0389 12.4869 12.1151 12.4552C12.1912 12.4235 12.2604 12.377 12.3185 12.3184C12.377 12.2603 12.4235 12.1912 12.4553 12.115C12.487 12.0388 12.5033 11.9571 12.5033 11.8746C12.5033 11.7921 12.487 11.7104 12.4553 11.6343C12.4235 11.5581 12.377 11.489 12.3185 11.4309L8.38097 7.49963Z"*/}
                {/*                        fill="#4C4C4C"/>*/}
                {/*                </svg>*/}
                {/*            </div>)*/}
                {/*        })}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </form>
    );
}

export default UserEditor;