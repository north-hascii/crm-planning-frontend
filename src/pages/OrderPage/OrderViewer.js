import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ORDER_EDIT_ROUTE, ORDER_VIEW_ROUTE} from "../../utils/consts";
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";
import {updateUser} from "../../http/userApi";
import {getSpecialtiesByPartName} from "../../http/specialtyApi";

function OrderViewer({order, manager}) {
    const {id} = useParams()

    const navigate = useNavigate()
    // const [firstName, setFirstName] = React.useState(user.first_name)
    // const [secondName, setSecondName] = React.useState(user.second_name)
    // const [thirdName, setThirdName] = React.useState(user.third_name)
    // const [email, setEmail] = React.useState(user.email)
    // const [status, setStatus] = React.useState(user.status)
    const [specInSearch, setSpecInSearch] = React.useState('')

    const [isSpecInputValid, setIsSpecInputValid] = React.useState(true)

    const [isSpecialtyListVisible, setIsSpecialtyListVisible] = React.useState(false)

    // const [specialtyList, setSpecialtyList] = React.useState(user.specialties ? user.specialties : [])
    // const [specialtyIdList, setSpecialtyIdList] = React.useState(user.specialties ? user.specialties.map(obj => obj.id)  : [])
    // const [availableSpecialtiesList, setAvailableSpecialtiesList] = React.useState([])

    const [orderState, setOrderState] = React.useState(order)

    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        setIsLoading(true)

    }, [])

    const makeUpdateRequest = async (e) => {
        e.preventDefault()
        // updateUser(
        //     user.id,
        //     email,
        //     firstName,
        //     secondName,
        //     thirdName,
        //     user.user_role,
        //     status,
        //     specialtyIdList
        // ).then(data => {
        //     console.log(data)
        // }).catch(err => {
        //     console.log(err)
        // })
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
            // setAvailableSpecialtiesList(data)
            setIsSpecialtyListVisible(true)
            setIsLoading(false)
        }).catch(err => {
            console.log("Error while getting data", err)
            setIsSpecialtyListVisible(true)
            setIsLoading(false)
        })
    }

    const getManagerName = () => {
        // console.log(order.manager_user)
        // return order.manager_user.first_name + ' ' + order.manager_user.second_name + ' ' + order.manager_user.third_name
        return 'manager'
    }

    const redirectToOrderCalculationInfo = (orderId) => {
        // navigate(`${ORDER_CALCULATION_INFO_ROUTE}/${orderId}`)
    }

    return (
        <div className={'viewer-container'}
            // onSubmit={(e) => makeUpdateRequest(e)}
        >
            <svg className={'navigate-to-editor-button'}
                 onClick={() => {
                     console.log('click on edit')
                     navigate(ORDER_EDIT_ROUTE + '/' + id)}
            }
                 width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M24.0932 0.110767C23.6518 0.227024 23.4472 0.319973 23.054 0.582863C22.8019 0.751436 9.88133 13.6709 9.66213 13.9736C9.54286 14.1383 7.79791 20.3661 7.79831 20.6257C7.79876 20.9464 8.16808 21.3111 8.49236 21.3111C8.73969 21.3111 14.9461 19.5508 15.103 19.4361C15.1871 19.3747 18.1821 16.3798 21.7585 12.781C26.5073 8.00236 28.3239 6.13877 28.494 5.87126C28.9135 5.21167 29.0892 4.33142 28.9565 3.55455C28.9179 3.32893 28.7902 2.95292 28.6579 2.67578C28.4503 2.24101 28.3446 2.10897 27.626 1.38686C26.9063 0.663616 26.7767 0.558928 26.3433 0.350747C25.5776 -0.0171732 24.8667 -0.0929684 24.0932 0.110767ZM25.7392 1.65881C26.0488 1.81587 27.1995 2.97537 27.3705 3.30266C27.4838 3.51956 27.5046 3.6426 27.5052 4.1005C27.5061 4.78779 27.4019 5.00959 26.7586 5.68975L26.2943 6.1806L24.5749 4.45281L22.8555 2.72502L23.355 2.24791C23.6298 1.98553 23.9675 1.71597 24.1055 1.64884C24.5966 1.40994 25.2565 1.41399 25.7392 1.65881ZM2.69388 2.93839C1.50693 3.25861 0.595546 4.1107 0.173543 5.29476L0 5.78167V15.8972C0 25.5471 0.00476392 26.0283 0.104012 26.3515C0.313114 27.0324 0.541385 27.4128 1.04852 27.9256C1.40485 28.2859 1.6389 28.4677 1.9422 28.6197C2.77039 29.035 1.95661 29.0097 13.9231 28.992L24.6703 28.9762L25.0526 28.8267C26.1669 28.3911 26.9538 27.5836 27.3229 26.4971C27.4469 26.132 27.449 26.0745 27.4666 22.4509C27.4826 19.1493 27.4751 18.7573 27.3925 18.6002C27.2711 18.3692 27.0318 18.2337 26.7449 18.2337C26.5586 18.2337 26.4693 18.2729 26.2999 18.4288L26.0881 18.6238L26.0598 22.2328C26.0315 25.8284 26.0309 25.843 25.9018 26.164C25.6675 26.7463 25.2303 27.1857 24.6511 27.421L24.33 27.5514L13.9266 27.5666C7.05984 27.5766 3.4172 27.562 3.21145 27.5238C2.52822 27.3969 1.92224 26.9297 1.63754 26.3103L1.47455 25.9557V15.9257V5.89565L1.63907 5.53765C1.848 5.08293 2.33137 4.6195 2.79114 4.43303L3.11923 4.29996L6.69217 4.27147C10.6831 4.23967 10.4599 4.26417 10.6625 3.83516C10.7931 3.55871 10.7342 3.29343 10.4874 3.04535L10.2897 2.84675L6.64776 2.85051C3.62347 2.85359 2.95289 2.86852 2.69388 2.93839ZM23.5645 5.4969L25.237 7.17824L19.9488 12.4921L14.6607 17.8059L12.9875 16.1253C12.0672 15.201 11.3143 14.419 11.3143 14.3875C11.3143 14.3125 21.7603 3.81556 21.8348 3.81556C21.8663 3.81556 22.6447 4.57214 23.5645 5.4969ZM13.2287 18.5139C13.0235 18.5829 9.58483 19.5353 9.57536 19.5257C9.56923 19.5196 9.74147 18.8737 9.95806 18.0905C10.1747 17.3073 10.4061 16.4651 10.4723 16.2189L10.5927 15.7713L11.9463 17.1307C12.6929 17.8804 13.268 18.5007 13.2287 18.5139Z"
                      fill="#4C4C4C"/>
            </svg>
            <div className={'viewer-container-left'}>
                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Название проекта
                    </div>
                    <div className={'viewer-item-input'}>
                        {orderState.order_name}
                        {/*Светофор fdfdsfdsfsd fafdsfdsfsdfsdf fadfdsfdsfds fadfadfafad fadfadfafad fadfadfafad*/}
                    </div>
                </div>

                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        ФИО заказчика:
                    </div>
                    <div className={'viewer-item-input'}>
                        {orderState.customer_name}
                        {/*Петров Олег Александрович*/}
                    </div>
                </div>

                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Компания заказчика
                    </div>
                    <div className={'viewer-item-input'}>
                        {orderState.customer_company}
                        {/*ОАО Света 5 минут*/}
                    </div>

                </div>

                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Телефон для связи
                    </div>
                    <div className={'viewer-item-input'}>
                        {orderState.phone_customer}
                        {/*+79651167066*/}
                    </div>
                </div>

                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Почта заказчика
                    </div>
                    <div className={'viewer-item-input'}>
                        {order.email_customer}
                        {/*a.lebedev@gmail.com*/}
                    </div>
                </div>

                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Ответственный за проект
                    </div>
                    <div className={'viewer-item-input'}>
                        {manager.first_name + ' ' + manager.second_name + ' ' + manager.third_name + ' (' + manager.email + ')'}
                        {/*Виктор Петрович Баринов*/}
                    </div>
                </div>

                {/*<div className={'viewer-item'}>*/}
                {/*    <div className={'viewer-item-text'}>*/}
                {/*        Ответственный за проект*/}
                {/*    </div>*/}
                {/*    <div className={'viewer-search-item'}>*/}
                {/*        /!*<form className={'auth-form-container'} >*!/*/}
                {/*        <div className={'input-search-container'}*/}
                {/*            // onSubmit={(e) => makeSpecsSearch(e)}*/}
                {/*        >*/}
                {/*            <input className={'viewer-item-input'}*/}
                {/*                   name={'specialty_name'}*/}
                {/*                   type={'text'}*/}
                {/*                // value={specInSearch}*/}
                {/*                // onChange={(e) => setSpecInSearch(e.target.value)}*/}
                {/*            />*/}

                {/*            <svg className={`input-search-hide ${isSpecialtyListVisible ? 'visible' : 'hidden'}`}*/}
                {/*                 onClick={() => setIsSpecialtyListVisible(false)}*/}
                {/*                 width="20" height="20" viewBox="0 0 20 20" fill="none"*/}
                {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                {/*                <path*/}
                {/*                    d="M10.5916 10.4499C10.5142 10.3718 10.422 10.3098 10.3205 10.2675C10.2189 10.2252 10.11 10.2035 9.99998 10.2035C9.88997 10.2035 9.78105 10.2252 9.6795 10.2675C9.57795 10.3098 9.48578 10.3718 9.40831 10.4499L6.90831 12.9499C6.74697 13.1069 6.65457 13.3215 6.65145 13.5465C6.64832 13.7715 6.73472 13.9886 6.89164 14.1499C7.04856 14.3113 7.26315 14.4037 7.48819 14.4068C7.71324 14.4099 7.9303 14.3235 8.09164 14.1666L9.99998 12.2166L11.9083 14.1666C11.9858 14.2447 12.0779 14.3067 12.1795 14.349C12.281 14.3913 12.39 14.4131 12.5 14.4131C12.61 14.4131 12.7189 14.3913 12.8205 14.349C12.922 14.3067 13.0142 14.2447 13.0916 14.1666C13.1698 14.0891 13.2317 13.997 13.2741 13.8954C13.3164 13.7939 13.3381 13.685 13.3381 13.5749C13.3381 13.4649 13.3164 13.356 13.2741 13.2545C13.2317 13.1529 13.1698 13.0608 13.0916 12.9833L10.5916 10.4499ZM8.09164 9.54995L9.99998 7.63328L11.9083 9.54995C11.9858 9.62806 12.0779 9.69005 12.1795 9.73236C12.281 9.77467 12.39 9.79645 12.5 9.79645C12.61 9.79645 12.7189 9.77467 12.8205 9.73236C12.922 9.69005 13.0142 9.62806 13.0916 9.54995C13.1698 9.47248 13.2317 9.38031 13.2741 9.27876C13.3164 9.17721 13.3381 9.06829 13.3381 8.95828C13.3381 8.84827 13.3164 8.73935 13.2741 8.6378C13.2317 8.53625 13.1698 8.44408 13.0916 8.36662L10.5916 5.86662C10.5142 5.78851 10.422 5.72651 10.3205 5.68421C10.2189 5.6419 10.11 5.62012 9.99998 5.62012C9.88997 5.62012 9.78105 5.6419 9.6795 5.68421C9.57795 5.72651 9.48578 5.78851 9.40831 5.86662L6.90831 8.36662C6.75139 8.52354 6.66323 8.73636 6.66323 8.95828C6.66323 9.1802 6.75139 9.39303 6.90831 9.54995C7.06523 9.70687 7.27806 9.79502 7.49998 9.79502C7.7219 9.79502 7.93472 9.70687 8.09164 9.54995V9.54995Z"*/}
                {/*                    fill="#4C4C4C" fillOpacity="0.5"/>*/}
                {/*            </svg>*/}
                {/*            /!*<button  type={'submit'}>*!/*/}
                {/*            <svg className={'input-search-button'} type={'submit'}*/}
                {/*                 onClick={() => clckOnSearchButton()}*/}
                {/*                 width="15" height="15" viewBox="0 0 15 15" fill="none"*/}
                {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                {/*                <path*/}
                {/*                    d="M13.5691 12.6816L11.2504 10.3816C12.1504 9.25937 12.5863 7.83493 12.4684 6.40118C12.3504 4.96743 11.6877 3.63336 10.6163 2.67327C9.54497 1.71318 8.1465 1.20006 6.70844 1.23941C5.27039 1.27876 3.90207 1.86759 2.88483 2.88483C1.86759 3.90207 1.27876 5.27039 1.23941 6.70844C1.20006 8.1465 1.71318 9.54497 2.67327 10.6163C3.63336 11.6877 4.96743 12.3504 6.40118 12.4684C7.83493 12.5863 9.25937 12.1504 10.3816 11.2504L12.6816 13.5504C12.7397 13.6089 12.8088 13.6554 12.885 13.6872C12.9612 13.7189 13.0429 13.7352 13.1254 13.7352C13.2079 13.7352 13.2896 13.7189 13.3657 13.6872C13.4419 13.6554 13.511 13.6089 13.5691 13.5504C13.6818 13.4338 13.7447 13.2781 13.7447 13.116C13.7447 12.9539 13.6818 12.7982 13.5691 12.6816ZM6.87537 11.2504C6.01007 11.2504 5.16421 10.9938 4.44475 10.513C3.72528 10.0323 3.16453 9.34903 2.83339 8.54961C2.50226 7.75018 2.41562 6.87051 2.58443 6.02185C2.75324 5.17318 3.16992 4.39363 3.78178 3.78178C4.39363 3.16992 5.17318 2.75324 6.02185 2.58443C6.87051 2.41562 7.75018 2.50226 8.54961 2.83339C9.34903 3.16453 10.0323 3.72528 10.513 4.44475C10.9938 5.16421 11.2504 6.01007 11.2504 6.87537C11.2504 8.03569 10.7894 9.14849 9.96896 9.96896C9.14849 10.7894 8.03569 11.2504 6.87537 11.2504Z"*/}
                {/*                    fill="#4C4C4C" fillOpacity="0.5"/>*/}
                {/*            </svg>*/}
                {/*            /!*Search*!/*/}
                {/*            /!*</button>*!/*/}
                {/*        </div>*/}
                {/*        /!*<div className={`input-error ${isSpecInputValid > 0 ? 'hidden' : 'visible'}`}>*!/*/}
                {/*        /!*    Поле не заполнено*!/*/}
                {/*        /!*</div>*!/*/}
                {/*        /!*<div className={`search-result-container ${isSpecialtyListVisible ? 'visible' : 'hidden'}`}>*!/*/}
                {/*        /!*{availableSpecialtiesList && availableSpecialtiesList.length > 0 ? availableSpecialtiesList.map((item, index) => {*!/*/}
                {/*        /!*        return (*!/*/}
                {/*        /!*            <div className={'search-result enable'} key={index} onClick={() => {*!/*/}
                {/*        /!*                setIsSpecialtyListVisible(false)*!/*/}
                {/*        /!*                if (!specialtyIdList.includes(item.id)) {*!/*/}
                {/*        /!*                    setSpecialtyList(specialtyList => [...specialtyList, item])*!/*/}
                {/*        /!*                    setSpecialtyIdList(specialtyList => [...specialtyIdList, item.id])*!/*/}
                {/*        /!*                }*!/*/}
                {/*        /!*            }}>*!/*/}
                {/*        /!*                {item.specialty_name}*!/*/}
                {/*        /!*            </div>*!/*/}
                {/*        /!*        )*!/*/}
                {/*        /!*    })*!/*/}
                {/*        /!*    :*!/*/}
                {/*        /!*    <div className={`search-result`}>*!/*/}
                {/*        /!*        Поиск не дал результатов*!/*/}
                {/*        /!*    </div>*!/*/}
                {/*        /!*}*!/*/}
                {/*        /!*</div>*!/*/}
                {/*    </div>*/}
                {/*    <div className={'viewer-selected-item-container'}>*/}
                {/*        /!*{specialtyList && specialtyList.map((item, index) => {*!/*/}
                {/*        /!*    return (<div className={'viewer-selected-item'} key={index}>*!/*/}
                {/*        /!*        {item.specialty_name}*!/*/}
                {/*        /!*        <svg className={'delete'} onClick={() => {*!/*/}
                {/*        /!*            setSpecialtyList(specialtyList.filter(itemTmp => itemTmp !== item));*!/*/}
                {/*        /!*            setSpecialtyIdList(specialtyIdList.filter(id => id !== item.id));*!/*/}
                {/*        /!*        }}*!/*/}
                {/*        /!*             width="15" height="15" viewBox="0 0 15 15" fill="none"*!/*/}
                {/*        /!*             xmlns="http://www.w3.org/2000/svg">*!/*/}
                {/*        /!*            <path*!/*/}
                {/*        /!*                d="M8.38097 7.49963L12.3185 3.56838C12.4362 3.45069 12.5023 3.29107 12.5023 3.12463C12.5023 2.95819 12.4362 2.79857 12.3185 2.68088C12.2008 2.56319 12.0412 2.49707 11.8747 2.49707C11.7083 2.49707 11.5487 2.56319 11.431 2.68088L7.49972 6.61838L3.56847 2.68088C3.45078 2.56319 3.29116 2.49707 3.12472 2.49707C2.95828 2.49707 2.79866 2.56319 2.68097 2.68088C2.56328 2.79857 2.49716 2.95819 2.49716 3.12463C2.49716 3.29107 2.56328 3.45069 2.68097 3.56838L6.61847 7.49963L2.68097 11.4309C2.62239 11.489 2.57589 11.5581 2.54416 11.6343C2.51243 11.7104 2.49609 11.7921 2.49609 11.8746C2.49609 11.9571 2.51243 12.0388 2.54416 12.115C2.57589 12.1912 2.62239 12.2603 2.68097 12.3184C2.73907 12.377 2.8082 12.4235 2.88436 12.4552C2.96052 12.4869 3.04221 12.5033 3.12472 12.5033C3.20723 12.5033 3.28892 12.4869 3.36508 12.4552C3.44124 12.4235 3.51037 12.377 3.56847 12.3184L7.49972 8.38088L11.431 12.3184C11.4891 12.377 11.5582 12.4235 11.6344 12.4552C11.7105 12.4869 11.7922 12.5033 11.8747 12.5033C11.9572 12.5033 12.0389 12.4869 12.1151 12.4552C12.1912 12.4235 12.2604 12.377 12.3185 12.3184C12.377 12.2603 12.4235 12.1912 12.4553 12.115C12.487 12.0388 12.5033 11.9571 12.5033 11.8746C12.5033 11.7921 12.487 11.7104 12.4553 11.6343C12.4235 11.5581 12.377 11.489 12.3185 11.4309L8.38097 7.49963Z"*!/*/}
                {/*        /!*                fill="#4C4C4C"/>*!/*/}
                {/*        /!*        </svg>*!/*/}
                {/*        /!*    </div>)*!/*/}
                {/*        /!*})}*!/*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<Button text={'Сохранить'}*/}
                {/*        size={buttonProps.size.small}*/}
                {/*        color={buttonProps.color.light}*/}
                {/*        bgColor={buttonProps.background_color.dark_v1}*/}
                {/*        type={'submit'}*/}
                {/*/>*/}


            </div>
            <div className={'viewer-container-right'}>
                <div className={'viewer-item'}>
                    <div className={'viewer-item-text'}>
                        Описание проекта
                    </div>
                    <div className={'viewer-item-textarea'}>
                        {orderState.description}
                        {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut*/}
                        {/*labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco*/}
                        {/*laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in*/}
                        {/*voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat*/}
                        {/*non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderViewer;