import { resources, defaultNS } from '../locales/i18n'
import { LangResource } from './index'

declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: LangResource;
    };
};