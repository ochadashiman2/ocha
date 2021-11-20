import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { saveLanguage } from '../../lib/Storage';

export const TranslationProvider: React.VFC<{ children: JSX.Element }> = ({ children }) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        (async () => {
            const language = await window.callOverlayHandler?.({ call: 'getLanguage' })
                .then(ret => ret.language) ?? 'English';
            saveLanguage(language);
            i18n.changeLanguage(language);
        })();
        return () => { };
    }, []);

    return children;
}