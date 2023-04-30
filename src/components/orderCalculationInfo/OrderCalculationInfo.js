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
            <CalculationStageInfo />
        </div>
    );
}

export default OrderEditor;