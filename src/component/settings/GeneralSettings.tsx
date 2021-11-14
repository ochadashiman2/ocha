import { useContext } from 'react';
import { SettingsContext } from '.';
import { useSetSettings } from '../../hooks/useSetSettings';
import { DEFAULT_SETTINGS } from '../../lib/Constants';
import { saveSettings } from '../../lib/Storage';
import { CheckBox } from './ui/CheckBox';
import { ToggleSelector } from './ui/ToggleSelector';

export const HideOverlayAt: React.VFC<{}> = () => {
    const { value, setSettings, pushSettings } = useSetSettings('hideOverlayAt');
    return <input
        type='number'
        min={0}
        value={value.toString(10)}
        onChange={e => {
            const parsed = Number.parseInt(e.target.value);
            if (!Number.isSafeInteger(parsed)) {
                const min = Number.parseInt(e.target.min);
                return setSettings(min);
            }
            setSettings(parsed);
        }}
        onBlur={e => {
            const parsed = Number.parseInt(e.target.value);
            if (!Number.isSafeInteger(parsed))
                return;
            pushSettings(value);
        }}
    />;
};

export const OutputLogOnConsole: React.VFC<{}> = () => <CheckBox {...{ name: 'outputLogOnConsole' }} />
export const HideOthersName: React.VFC<{}> = () => <CheckBox {...{ name: 'hideOthersName' }} />;
export const HideOverlayAfterCombatEnd: React.VFC<{}> = () => <CheckBox {...{ name: 'hideOverlayAfterCombatEnd' }} />;
export const OverLayVerticalAlign: React.VFC<{}> = () => <ToggleSelector {...{
    name: 'overlayVerticalAlign',
    states: {
        'flex-start': { display: 'Top', next: 'flex-end' },
        'flex-end': { display: 'Bottom', next: 'flex-start' }
    }
}} />;

export const ResetSettings: React.VFC<{}> = () => {
    const [_, setFullSettings] = useContext(SettingsContext);
    return <input
        type='button'
        value='Reset'
        onClick={() => {
            if (!window.confirm('This will reset all settings.\nAre your sure you want to continue?'))
                return;
            setFullSettings(DEFAULT_SETTINGS);
            saveSettings(DEFAULT_SETTINGS);
            window.opener?.postMessage(DEFAULT_SETTINGS, location.origin);
        }}
    />;
};