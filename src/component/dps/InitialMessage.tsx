import { LogoContainer } from "../Logo";
import { useTranslation } from 'react-i18next';

export const InitialMessage: React.VFC<{
    showMessage: boolean;
    openWindow: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}> = ({ showMessage, openWindow }) => {
    const { t, i18n } = useTranslation('message');
    return <div
        className={`setting_message setting_message_${i18n.language} view ${showMessage ? 'show' : ''}`}
        onDoubleClick={openWindow}
    >
        <LogoContainer />
        <ul className='ul_items'>
            <li className='list_item'>{t('turnOnSettingsMode')}</li>
            <li className='list_item'>{t('openSettingsWindow')}</li>
        </ul>
    </div>;
}