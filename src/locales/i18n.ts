import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LangResources, LangResource } from '../@types/index';
// resources
import settings_en from './en/settings';
import settings_ja from './ja/settings';
import message_en from './en/message';
import message_ja from './ja/message';

// export for @types
export const defaultNS: keyof LangResource = 'settings'
const resources: LangResources = {
    English: { settings: settings_en, message: message_en },
    Japanese: { settings: settings_ja, message: message_ja },
};

i18n.use(initReactI18next).init({
    lng: 'English',
    fallbackLng: 'English',
    defaultNS,
    resources,
});