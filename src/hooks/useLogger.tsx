import { useContext, useEffect, useRef } from 'react';
import { SettingsContext } from '../component/dps/index';

export const defaultLogger = (m: any, ..._: any) => console.info(`%c[ocha]: ${m}`, 'color: #6565ff');
export const silentLogger = (..._: any) => { };
export const selectLogger = (outputLogOnConsole: boolean) =>
    outputLogOnConsole ? defaultLogger : silentLogger;

export const useLogger = () => {
    const [settings] = useContext(SettingsContext);

    const logger = useRef(selectLogger(settings.outputLogOnConsole));

    useEffect(() => {
        logger.current = selectLogger(settings.outputLogOnConsole);
    }, [settings.outputLogOnConsole]);

    return { logger }
};