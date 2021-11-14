import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SettingsContext } from '../component/dps/index';
import { isPartialSettings } from '../typeguard/index';
import { useLogger } from './useLogger';
import { loadWindowPosition } from '../lib/Storage';

export const useSettingsWindow = () => {
    const subWindow = useRef<Window>();
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [_, setSettings] = useContext(SettingsContext);
    const { logger } = useLogger();

    useEffect(() => {
        const recieveMessage = (event: MessageEvent) => {
            if (event.origin !== location.origin)
                return;
            if (!isPartialSettings(event.data))
                return;
            logger.current(`useSettings: change setting: ${JSON.stringify(event.data)}`);
            setSettings(prev => ({ ...prev, ...event.data }));
        };
        window.addEventListener('message', recieveMessage, false);
        return () => window.removeEventListener('message', recieveMessage);
    });

    const openWindow = useCallback(() => {
        const closed = subWindow.current === undefined || subWindow.current.closed;
        if (!closed)
            return;
        const newWindow = window.open('./settings.html', undefined, loadWindowPosition());
        if (newWindow === null)
            return;
        subWindow.current = newWindow;
    }, []);

    return { openWindow, showMessage, setShowMessage };
};