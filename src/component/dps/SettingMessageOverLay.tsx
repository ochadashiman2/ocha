import React from 'react';
import { LogoContainer } from '../Logo';

export const SettingMessageOverLay: React.VFC<{
    showMessage: boolean;
    setShowMessage: (flag: boolean) => void;
    openWindow: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}> = ({ showMessage, openWindow, setShowMessage }) => <div
    className={`setting_message fade ${showMessage ? 'show' : ''}`}
    onDoubleClick={openWindow}
    onMouseOut={() => setShowMessage(false)}
>
    <LogoContainer />
    <ul className='ul_items'>
        <li className='list_item'>Lock overlay to turn off settings mode</li>
        <li className='list_item'>Double-click to open settings window</li>
    </ul>
</div>;