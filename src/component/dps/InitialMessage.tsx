import { LogoContainer } from "../Logo";
import { useTranslation } from 'react-i18next';

export const InitialMessage: React.VFC<{
    showMessage: boolean;
    openWindow: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}> = ({ showMessage, openWindow }) => {
    const { t, i18n } = useTranslation('message');
    const styleByLanguage = `setting_message_${i18n.language}`;
    const display = showMessage ? 'show' : '';
    return <div
        className={`setting_message fade ${styleByLanguage} ${display}`}
        onDoubleClick={openWindow}
    >
        <LogoContainer />
        <ul className='ul_items'>
            <li className='list_item'>{t('turnOnSettingsMode')}</li>
            <li className='list_item'>{t('openSettingsWindow')}</li>
        </ul>
    </div>;
}