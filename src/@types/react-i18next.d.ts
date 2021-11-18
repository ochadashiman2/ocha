import { LangResource } from './index'

declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: keyof LangResource;
        resources: LangResource;
    };
};