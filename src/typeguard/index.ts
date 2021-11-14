import { AppState, ChangePrimaryPlayer, CombatData, OverlayStateUpdate, Settings, Job, RgbaString } from '../@types';
import { RGBA_STRING_RX } from '../lib/Color';

export const hasOwnProperty = <T extends {}, U extends PropertyKey>(obj: T, prop: U): obj is T & Record<U, unknown> => 
    obj.hasOwnProperty(prop);

export const isOverlayStateUpdateEvent = (o: any): o is OverlayStateUpdate => {
    return typeof o?.detail?.isLocked === 'boolean';
};

export const isCombatDataEvent = (o: unknown): o is CombatData => true;
export const isAppState = (o: unknown): o is AppState => true;
export const isChangePrimaryPlayerEvent = (o: unknown): o is ChangePrimaryPlayer => true;
export const isPartialSettings = (o: unknown): o is Partial<Settings> => true;
export const isJob = (o: unknown): o is Job => {
    if (o === undefined)
        return false;
    if (o === '')
        return false;
    return true;
};

export const isRgbaString = (o: unknown): o is RgbaString => {
    if(typeof o !== 'string')
        return false;
    return RGBA_STRING_RX.test(o);
}