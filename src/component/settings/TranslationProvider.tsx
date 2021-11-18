import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { loadLanguage } from '../../lib/Storage';

export const TranslationProvider: React.VFC<{ children: JSX.Element }> = ({ children }) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(loadLanguage());
        return () => { };
    }, []);

    return children;
}