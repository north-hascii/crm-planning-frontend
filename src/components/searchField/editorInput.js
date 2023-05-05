import React from 'react';

function EditorInput({
                         inputTitle = 'Заголовок не определен',
                         placeholder = 'Не определен',
                         value = '',
                         onUpdate = Function.prototype
                     }) {
    return (
        <div className={'editor-item'}>
            <div className={'editor-item-text'}>
                {inputTitle}
            </div>
            <input className={'editor-item-input'}
                   placeholder={placeholder}
                   value={value}
                   onChange={(e) => onUpdate(e.target.value)}
            />
        </div>
    );
}

export default EditorInput;