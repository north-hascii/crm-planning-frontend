import React from 'react';
import '../orderEditor/OrderEditor.scss'
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";
import {
    ORDER_CALCULATION_EDIT_ROUTE,
    ORDER_CALCULATION_INFO_ROUTE,
    ORDER_EDIT_ROUTE,
    ORDER_INFO_ROUTE
} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import CalculationStageInfo from "./CalculationStageInfo";

function OrderEditor({order}) {
    const navigate = useNavigate()

    const redirectToOrderCalculationInfo = (orderId) => {
        navigate(`${ORDER_CALCULATION_INFO_ROUTE}/${orderId}`)
    }

    return (
        <div className={'editor-container'}>
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
    );
}

export default OrderEditor;