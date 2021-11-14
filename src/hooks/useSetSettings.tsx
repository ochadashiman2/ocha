import { useContext } from 'react';
import { Settings } from '../@types/index';
import { SettingsContext } from '../component/settings';
import { saveSettings } from '../lib/Storage';

export const useSetSettings = <T extends keyof Settings>(key: T) => {
    const [current, setFullSettings] = useContext(SettingsContext);

    const setSettings = (updateValue: Settings[T]) => {
        setFullSettings(prev => ({ ...prev, [key]: updateValue }));
    };

    const pushSettings = (updateValue: Settings[T]) => {
        const setting = { [key]: updateValue };
        saveSettings({ ...current, ...setting });
        window.opener?.postMessage(setting, location.origin);
    };

    return { value: current[key], setSettings, pushSettings };
};