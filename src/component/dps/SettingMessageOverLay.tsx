import React from 'react';
import { useTranslation } from 'react-i18next';
import { LogoContainer } from '../Logo';

export const SettingMessageOverLay: React.VFC<{
    showMessage: boolean;
    setShowMessage: (flag: boolean) => void;
    openWindow: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}> = ({ showMessage, openWindow, setShowMessage }) => {
    const { t } = useTranslation('message');
    return <div
        className={`setting_message fade ${showMessage ? 'show' : ''}`}
        onDoubleClick={openWindow}
        onMouseOut={() => setShowMessage(false)}
    >
        <LogoContainer />
        <ul className='ul_items'>
            <li className='list_item'>{t('turnOffSettingsMode')}</li>
            <li className='list_item'>{t('openSettingsWindow')}</li>
        </ul>
    </div>;
}