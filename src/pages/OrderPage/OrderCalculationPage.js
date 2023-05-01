import React from 'react';

function OrderCalculationPage(props) {

    const [productCounter, setProductCounter] = React.useState(1)

    return (
        <div className={'admin-page-edit'}>
            <div className={'admin-page-container'}>
                <div className={'page-title'}>
                    Калькуляция
                </div>
                <div className={'calculation-product-container'}>
                    <div className={'calculation-product-info'}>
                        <div className={'editor-item'}>
                            <div className={'editor-item-text'}>
                                Название продукта
                            </div>
                            <input className={'editor-item-input green-border'}
                                   required
                                   name={'second_name'}
                                   type={'text'}
                                // value={secondName}
                                // onChange={(e) => setSecondName(e.target.value)}
                            />
                        </div>
                        <div className={'editor-item'}>
                            <div className={'editor-item-text'}>
                                Количество
                            </div>
                            <input className={'editor-item-input green-border quantity'}
                                   required
                                   name={'second_name'}
                                   type={'number'}
                                   onChange={(e) => console.log(e.target.value)}
                                   value={productCounter}
                                // onChange={(e) => setSecondName(e.target.value)}
                            />
                            <svg className={'increase-quantity-button'}
                                 onClick={() => setProductCounter(productCounter + 1)}
                                 width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10.0603 3.49925C10.3364 3.49925 10.5603 3.72311 10.5603 3.99925V9.56026H16.1207C16.3968 9.56026 16.6207 9.78412 16.6207 10.0603C16.6207 10.3364 16.3968 10.5603 16.1207 10.5603H10.5603V16.1205C10.5603 16.3966 10.3364 16.6205 10.0603 16.6205C9.78412 16.6205 9.56026 16.3966 9.56026 16.1205V10.5603H3.99948C3.72334 10.5603 3.49948 10.3364 3.49948 10.0603C3.49948 9.78412 3.72334 9.56026 3.99948 9.56026H9.56026V3.99925C9.56026 3.72311 9.78412 3.49925 10.0603 3.49925Z"
                                      fill="#4C4C4C" fill-opacity="0.5"/>
                            </svg>
                            <svg className={'increase-quantity-button'}
                                 onClick={() => setProductCounter(productCounter + 1)}
                                 width="21" height="20" viewBox="0 0 21 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M19.6084 10C19.6084 14.9706 15.579 19 10.6084 19C5.63784 19 1.6084 14.9706 1.6084 10C1.6084 5.02944 5.63784 1 10.6084 1C15.579 1 19.6084 5.02944 19.6084 10ZM20.6084 10C20.6084 15.5228 16.1312 20 10.6084 20C5.08555 20 0.608398 15.5228 0.608398 10C0.608398 4.47715 5.08555 0 10.6084 0C16.1312 0 20.6084 4.47715 20.6084 10ZM16.7291 10.5603C17.0052 10.5603 17.2291 10.3364 17.2291 10.0603C17.2291 9.78412 17.0052 9.56026 16.7291 9.56026L4.60788 9.56026C4.33174 9.56026 4.10788 9.78412 4.10788 10.0603C4.10788 10.3364 4.33174 10.5603 4.60788 10.5603L16.7291 10.5603Z"
                                      fill="#4C4C4C" fill-opacity="0.5"/>
                            </svg>

                        </div>
                    </div>
                    <div className={'calculation-product-task-container'}>
                        <div className={'calculation-product-task'}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderCalculationPage;