import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { saveLanguage } from '../../lib/Storage';

export const TranslationProvider: React.VFC<{ children: JSX.Element }> = ({ children }) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        (async () => {
            const result = await window.callOverlayHandler?.({ call: 'getLanguage' })
                .then((ret: any) => ret.language) ?? 'English';
            saveLanguage(result);
            i18n.changeLanguage(result);
        })();
        return () => { };
    }, []);

    return children;
}