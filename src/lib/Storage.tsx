import { Settings } from '../@types/index';
import { isPartialSettings } from '../typeguard';
import { DEFAULT_SETTINGS, DEFAULT_WINDOWPOSITION, LOCAL_STORAGE_KEY, LOCAL_WINDOWFEATURES_KEY } from './Constants';

export const loadSettings = (): Settings => {
    const settings = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (settings === null)
        return DEFAULT_SETTINGS;
    const parsed: unknown = JSON.parse(settings);
    if (!isPartialSettings(parsed))
        return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...parsed };
}

export const saveSettings = (settings: Settings): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
}

export const loadWindowPosition = (): string => {
    const features = localStorage.getItem(LOCAL_WINDOWFEATURES_KEY);
    if (features === null)
        return DEFAULT_WINDOWPOSITION;
    return features;
}

export const saveWindowPosition = (): void => {
    const magicOffset = { left: -8, top: -31, width: 16, height: 39 };
    const pos = {
        left: window.screenLeft + magicOffset.left,
        top: window.screenTop + magicOffset.top,
        width: window.outerWidth + magicOffset.width,
        height: window.outerHeight + magicOffset.height,
    }
    const features = `left=${pos.left},top=${pos.top},width=${pos.width},height=${pos.height}`;
    localStorage.setItem(LOCAL_WINDOWFEATURES_KEY, features);
}