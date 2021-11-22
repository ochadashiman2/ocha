import { useContext, useEffect, useRef, useState } from 'react';
import { ActApi, AppState } from '../../@types';
import { SettingsContext } from '../../component/dps/index';
import { combatDataParser } from '../../lib/combatDataParser';
import { INITIAL_APPSTATE, SETTING_APP_STATE } from '../../lib/Constants';
import { isChangePrimaryPlayerEvent, isCombatDataEvent, isOverlayStateUpdateEvent } from '../../typeguard';
import { useLogger } from '../useLogger';

export const createSettingAppState = (primaryName: string): AppState => {
    const [first, ...others] = SETTING_APP_STATE.players
    return {
        ...SETTING_APP_STATE,
        players: [{ ...first, name: primaryName }, ...others]
    };
};

export const useOverlayPluginApi: ActApi = (parser = combatDataParser) => {
    const [appState, setAppState] = useState<AppState>(INITIAL_APPSTATE);
    const [primaryName, setPrimaryName] = useState<string>('You');
    const [isLocked, setIsLocked] = useState<boolean>(true);
    const clearUiTimerId = useRef<number>();
    const [alreadyInit, setAlreadyInit] = useState<boolean>(false);
    const [settings] = useContext(SettingsContext);
    const { logger } = useLogger();

    useEffect(() => {
        logger.current('useOverlayPluginApi: useEffect: ChangePrimaryPlayerEventHandler');
        const ChangePrimaryPlayerEventHandler = (e: unknown) => {
            if (!isChangePrimaryPlayerEvent(e))
                return;
            logger.current(`useOverlayPluginApi: ChangePrimaryPlayer: charName=${e.charName}`);
            setPrimaryName(e.charName);
        };
        window.addOverlayListener?.('ChangePrimaryPlayer', ChangePrimaryPlayerEventHandler);
        return () => window.removeOverlayListener?.('ChangePrimaryPlayer', ChangePrimaryPlayerEventHandler);
    }, []);

    useEffect(() => {
        logger.current('useOverlayPluginApi: useEffect: OverlayStateUpdateEventHandler')
        const OverlayStateUpdateEventHandler = (e: unknown) => {
            if (!isOverlayStateUpdateEvent(e))
                return;
            logger.current(`useOverlayPluginApi: onOverlayStateUpdate: isLocked=${e.detail.isLocked}`)
            if (e.detail.isLocked) {
                document.documentElement.classList.remove('resize');
            } else {
                document.documentElement.classList.add('resize');
                window.clearTimeout(clearUiTimerId.current);
            }
            setIsLocked(e.detail.isLocked);
        };
        document.addEventListener('onOverlayStateUpdate', OverlayStateUpdateEventHandler);
        return () => document.removeEventListener('onOverlayStateUpdate', OverlayStateUpdateEventHandler);
    }, []);

    useEffect(() => {
        logger.current('useOverlayPluginApi: useEffect: CombatDataEventHandler');

        const CombatDataEventHandler = (e: unknown) => {
            if(!isLocked)
                return;
   
            if (!isCombatDataEvent(e))
                return;

            const needToSetClearUiTimer = e.isActive === 'false' && settings.hideOverlayAfterCombatEnd;

            if (needToSetClearUiTimer) {
                clearUiTimerId.current = window.setTimeout(() => setAppState(INITIAL_APPSTATE), settings.hideOverlayAt * 1000);
            } else {
                window.clearTimeout(clearUiTimerId.current);
            }

            const nextState = parser(e, primaryName);
            setAppState(nextState);
        };

        window.addOverlayListener?.('CombatData', CombatDataEventHandler);
        return () => window.removeOverlayListener?.('CombatData', CombatDataEventHandler);
    }, [isLocked, primaryName, settings.hideOverlayAt, settings.hideOverlayAfterCombatEnd]);

    useEffect(() => {
        if (alreadyInit)
            return () => { };
        logger.current(`useOverlayPluginApi: startOverlayEvents`);
        window.startOverlayEvents?.();
        setAlreadyInit(true);
        return () => { };
    }, [alreadyInit]);

    return {
        primaryName,
        alreadyInit,
        appState: isLocked ? appState : createSettingAppState(primaryName)
    };
};