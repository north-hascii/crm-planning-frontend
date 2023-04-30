import React from 'react';

function InputItems({isVisible = false, availableItems = [], currentItems = [], pushItem = (items, item) => {}}) {
    return (
        <div className={`search-result-container ${isVisible ? 'visible' : 'hidden'}`}>
            {/*{availableItems.map((item, index) => {*/}
            {/*    return (*/}
            {/*        <div className={'search-result'} key={index} onClick={(current,item) => {*/}
            {/*            if (!items.includes(item)) {*/}
            {/*                pushItem(currentItems, item)*/}
            {/*            }*/}
            {/*        }}*/}
            {/*        >*/}
            {/*            {item}*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    );
}

export default InputItems;