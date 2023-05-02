import React from 'react';
import Button from "../../components/Button/Button";
import {buttonProps} from "../../components/Button/ButtonProps";
import {getSpecialtiesByPartName} from "../../http/specialtyApi";
import './OrderCalculationPage.scss'

function ProductTask({
                         task,
                         onUpdate = (task) => {

                         },
                         onDelete = () => {

                         }
                     }) {
    const [taskState, setTaskState] = React.useState(task)
    const [specInSearch, setSpecInSearch] = React.useState('')

    const [isSpecInputValid, setIsSpecInputValid] = React.useState(true)

    const [isSpecialtyListVisible, setIsSpecialtyListVisible] = React.useState(false)

    const [specialtyList, setSpecialtyList] = React.useState([])
    const [specialtyIdList, setSpecialtyIdList] = React.useState([])
    const [availableSpecialtiesList, setAvailableSpecialtiesList] = React.useState([])


    const [initStageIndex, setInitStageIndex] = React.useState(task.stage ? task.stage : 1)
    // const [initTaskCount, setInitTaskCount] = React.useState(taskState.count ? taskState.count : 1)
    const [stageIndex, setStageIndex] = React.useState(task.stage ? task.stage : 1)
    const [taskCount, setTaskCount] = React.useState(task.count ? task.count : 1)

    const [taskComment, setTaskComment] = React.useState('')
    // const [taskState, setTaskState] = React.useState(task)

    React.useEffect(() => {
        // onUpdate(task)
        // setTas
        console.log('task changed', task)
        setTaskState(task)
    }, [task])

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
            // setIsLoading(false)
        }).catch(err => {
            console.log("Error while getting data", err)
            setIsSpecialtyListVisible(true)
            // setIsLoading(false)
        })
    }

    const increaseStageIndex = () => {
        if (Math.abs(initStageIndex - stageIndex) === 0) {
            task.stage = stageIndex + 1
            setStageIndex(stageIndex + 1)
            onUpdate(task)
        }

    }

    const decreaseStageIndex = () => {
        if (Math.abs(initStageIndex - stageIndex) === 1) {
            task.stage = stageIndex - 1
            setStageIndex(stageIndex - 1)
            onUpdate(task)
        }
    }

    const increaseTaskCount = () => {
        task.count = taskCount + 1
        setTaskCount(taskCount + 1)
        onUpdate(task)
    }


    const decreaseTaskCounter = () => {
        if (taskCount - 1 > 0) {
            task.count = taskCount - 1
            setTaskCount(taskCount - 1)
            onUpdate(task)
        }
    }

    const updateTaskComment = (text) => {
        task.description = text
        setTaskComment(text)
        setTaskState(task)
        onUpdate(task)
    }

    return (
        <div className={'calculation-product-task-container'}>
            <svg className={'calculation-delete-product-button'}
                 onClick={() => {
                     // onDelete(product.product_id)
                     onDelete()
                 }}
                 width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5772 12.5002L21.1397 5.94811C21.3358 5.75196 21.446 5.48592 21.446 5.20853C21.446 4.93113 21.3358 4.66509 21.1397 4.46894C20.9435 4.27279 20.6775 4.1626 20.4001 4.1626C20.1227 4.1626 19.8566 4.27279 19.6605 4.46894L13.1084 11.0314L6.55632 4.46894C6.36017 4.27279 6.09413 4.1626 5.81673 4.1626C5.53934 4.1626 5.2733 4.27279 5.07715 4.46894C4.881 4.66509 4.77081 4.93113 4.77081 5.20853C4.77081 5.48592 4.881 5.75196 5.07715 5.94811L11.6397 12.5002L5.07715 19.0523C4.97952 19.1491 4.90202 19.2643 4.84914 19.3913C4.79626 19.5182 4.76903 19.6543 4.76903 19.7919C4.76903 19.9294 4.79626 20.0655 4.84914 20.1925C4.90202 20.3194 4.97952 20.4346 5.07715 20.5314C5.17399 20.6291 5.2892 20.7066 5.41613 20.7595C5.54307 20.8123 5.67922 20.8396 5.81673 20.8396C5.95425 20.8396 6.0904 20.8123 6.21734 20.7595C6.34427 20.7066 6.45948 20.6291 6.55632 20.5314L13.1084 13.9689L19.6605 20.5314C19.7573 20.6291 19.8725 20.7066 19.9995 20.7595C20.1264 20.8123 20.2626 20.8396 20.4001 20.8396C20.5376 20.8396 20.6737 20.8123 20.8007 20.7595C20.9276 20.7066 21.0428 20.6291 21.1397 20.5314C21.2373 20.4346 21.3148 20.3194 21.3677 20.1925C21.4205 20.0655 21.4478 19.9294 21.4478 19.7919C21.4478 19.6543 21.4205 19.5182 21.3677 19.3913C21.3148 19.2643 21.2373 19.1491 21.1397 19.0523L14.5772 12.5002Z" fill="#4C4C4C"/>
            </svg>
            <div className={'calculation-product-task'}>
                <div className={'calculation-product-task-left'}>
                    <div className={'editor-item'}>
                        <div className={'editor-item-text'}>
                            Номер стадии
                        </div>
                        <div className={'editor-item-input-container'}>
                            <input className={'editor-item-input quantity'}
                                   required
                                   name={'second_name'}
                                   type={'number'}
                                   onChange={(e) => {
                                   }}
                                   value={taskState.stage}
                            />

                            <svg className={'increase-quantity-button'}
                                 onClick={() => increaseStageIndex()}
                                 width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10.0603 3.49925C10.3364 3.49925 10.5603 3.72311 10.5603 3.99925V9.56026H16.1207C16.3968 9.56026 16.6207 9.78412 16.6207 10.0603C16.6207 10.3364 16.3968 10.5603 16.1207 10.5603H10.5603V16.1205C10.5603 16.3966 10.3364 16.6205 10.0603 16.6205C9.78412 16.6205 9.56026 16.3966 9.56026 16.1205V10.5603H3.99948C3.72334 10.5603 3.49948 10.3364 3.49948 10.0603C3.49948 9.78412 3.72334 9.56026 3.99948 9.56026H9.56026V3.99925C9.56026 3.72311 9.78412 3.49925 10.0603 3.49925Z"
                                      fill="#4C4C4C" fillOpacity="0.5"/>
                            </svg>
                            <svg className={'decrease-quantity-button'}
                                 onClick={() => decreaseStageIndex()}
                                 width="21" height="20" viewBox="0 0 21 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M19.6084 10C19.6084 14.9706 15.579 19 10.6084 19C5.63784 19 1.6084 14.9706 1.6084 10C1.6084 5.02944 5.63784 1 10.6084 1C15.579 1 19.6084 5.02944 19.6084 10ZM20.6084 10C20.6084 15.5228 16.1312 20 10.6084 20C5.08555 20 0.608398 15.5228 0.608398 10C0.608398 4.47715 5.08555 0 10.6084 0C16.1312 0 20.6084 4.47715 20.6084 10ZM16.7291 10.5603C17.0052 10.5603 17.2291 10.3364 17.2291 10.0603C17.2291 9.78412 17.0052 9.56026 16.7291 9.56026L4.60788 9.56026C4.33174 9.56026 4.10788 9.78412 4.10788 10.0603C4.10788 10.3364 4.33174 10.5603 4.60788 10.5603L16.7291 10.5603Z"
                                      fill="#4C4C4C" fillOpacity="0.5"/>
                            </svg>
                        </div>
                    </div>
                    <div className={'editor-item'}>
                        <div className={'editor-item-text'}>
                            Количество
                        </div>
                        <div className={'editor-item-input-container'}>
                            <input className={'editor-item-input quantity'}
                                   required
                                   name={'second_name'}
                                   type={'number'}
                                   onChange={(e) => {
                                   }}
                                   value={taskState.count}
                            />

                            <svg className={'increase-quantity-button'}
                                 onClick={() => increaseTaskCount()}
                                 width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10.0603 3.49925C10.3364 3.49925 10.5603 3.72311 10.5603 3.99925V9.56026H16.1207C16.3968 9.56026 16.6207 9.78412 16.6207 10.0603C16.6207 10.3364 16.3968 10.5603 16.1207 10.5603H10.5603V16.1205C10.5603 16.3966 10.3364 16.6205 10.0603 16.6205C9.78412 16.6205 9.56026 16.3966 9.56026 16.1205V10.5603H3.99948C3.72334 10.5603 3.49948 10.3364 3.49948 10.0603C3.49948 9.78412 3.72334 9.56026 3.99948 9.56026H9.56026V3.99925C9.56026 3.72311 9.78412 3.49925 10.0603 3.49925Z"
                                      fill="#4C4C4C" fillOpacity="0.5"/>
                            </svg>
                            <svg className={'decrease-quantity-button'}
                                 onClick={() => decreaseTaskCounter()}
                                 width="21" height="20" viewBox="0 0 21 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M19.6084 10C19.6084 14.9706 15.579 19 10.6084 19C5.63784 19 1.6084 14.9706 1.6084 10C1.6084 5.02944 5.63784 1 10.6084 1C15.579 1 19.6084 5.02944 19.6084 10ZM20.6084 10C20.6084 15.5228 16.1312 20 10.6084 20C5.08555 20 0.608398 15.5228 0.608398 10C0.608398 4.47715 5.08555 0 10.6084 0C16.1312 0 20.6084 4.47715 20.6084 10ZM16.7291 10.5603C17.0052 10.5603 17.2291 10.3364 17.2291 10.0603C17.2291 9.78412 17.0052 9.56026 16.7291 9.56026L4.60788 9.56026C4.33174 9.56026 4.10788 9.78412 4.10788 10.0603C4.10788 10.3364 4.33174 10.5603 4.60788 10.5603L16.7291 10.5603Z"
                                      fill="#4C4C4C" fillOpacity="0.5"/>
                            </svg>
                        </div>
                    </div>
                    <div className={'editor-item'}>
                        <div className={'editor-item-text'}>
                            Операция
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
                                        setSpecialtyList(specialtyList.filter(itemTmp => itemTmp !== item))
                                        setSpecialtyIdList(specialtyIdList.filter(id => id !== item.id))
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

                </div>
                <div className={'calculation-product-task-right'}>
                    <div className={'editor-item'}>
                        <div className={'editor-item-text'}>
                            Комментарий к операции
                        </div>
                        <textarea className={'editor-item-textarea calculation'}
                                  value={taskState.description}
                                  onChange={(e) => updateTaskComment(e.target.value)}
                        />
                        {/*    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."*/}
                        {/*</textarea>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductTask;