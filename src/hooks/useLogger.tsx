import { useContext, useEffect, useRef } from 'react';
import { SettingsContext } from '../component/dps/index';

export const useLogger = () => {
    const [settings] = useContext(SettingsContext);

    const logger = useRef(settings.outputLogOnConsole
        ? (m: any, ..._: any) => console.info(`%c[Pulse]: ${m}`, 'color: #6565ff')
        : (..._: any) => { }
    );

    useEffect(() => {
        logger.current = settings.outputLogOnConsole
            ? console.info
            : (..._: any) => { };
    }, [settings.outputLogOnConsole]);

    return { logger }
};