import { useThrottleCallback } from '@react-hook/throttle';
import { useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';
import { ColorTypeKeys } from '../../@types';
import { useSetSettings } from '../../hooks/useSetSettings';
import { rgbaStringToRgba, rgbaToRgbaString } from '../../lib/Color';
import { isRgbaString } from '../../typeguard';
import { useTranslation } from 'react-i18next';

export const ColorPickerList: React.VFC<{ colorTypeKeysList: ColorTypeKeys[] }> = ({ colorTypeKeysList }) => {
    return <div>
        <div className='layout-row center'>
            {colorTypeKeysList.map(name => <ColorPicker {...{ name }} key={name} />)}
        </div>
    </div>
};

export const ColorPicker: React.VFC<{ name: ColorTypeKeys }> = ({ name }) => {
    const { t } = useTranslation();
    const { value, setSettings, pushSettings } = useSetSettings(name);
    const [textColor, setTextColor] = useState(rgbaToRgbaString(value));
    const tSetSettings = useThrottleCallback(setSettings, 30);
    const tPushSettings = useThrottleCallback(pushSettings, 30);

    return <div className="colorPicker padding">
        <label>{t(`color.${name}`)}</label>
        <RgbaColorPicker color={value} onChange={color => {
            setTextColor(rgbaToRgbaString(color))
            tSetSettings(color);
            tPushSettings(color);
        }} />
        <input type='text' value={textColor} style={{ marginTop: '0.5rem' }} onChange={e => {
            setTextColor(e.target.value);
            if (!isRgbaString(e.target.value))
                return;
            const color = rgbaStringToRgba(e.target.value);
            tSetSettings(color);
            tPushSettings(color);
        }} />
    </div>;
};