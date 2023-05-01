import React from 'react';
import Button from "../Button/Button";
import {buttonProps} from "../Button/ButtonProps";

function CalculationStageInfo({stage, index}) {
    return (
        <div className={'editor-container margin-bot-10'}>
            {/*<div className={'editor-container-left'}>*/}
            {/*    <div className={'editor-item'}>*/}
            {/*        <div className={'editor-item-text'}>*/}
            {/*            Название проекта*/}
            {/*        </div>*/}
            {/*        <div className={'editor-item-input'}>*/}
            {/*            {stage.order_name}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*/!*{  TODO: INFO Сделать нормальный css, у Тёмы лапки... Текст в левый угол; Положение кнопки пофиксить *!/*/}
            {/*<div className={'editor-container-right'}>*/}
            {/*    <div className={'editor-item big'}>*/}
            {/*        <div className={'editor-item-text big'}>*/}
            {/*            Описание проекта*/}
            {/*        </div>*/}
            {/*        <div className={'editor-item-input'}>*/}
            {/*            {order.description}*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <Button text={'Перейти к Калькуляции'}*/}
            {/*            size={buttonProps.size.small}*/}
            {/*            color={buttonProps.color.light}*/}
            {/*            bgColor={buttonProps.background_color.dark_v1}*/}
            {/*            onClck={() => redirectToOrderCalculationInfo(order.id)}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
}

export default CalculationStageInfo;