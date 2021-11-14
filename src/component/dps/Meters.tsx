import React, { useContext } from 'react';
import { RgbaColor } from 'react-colorful';
import { MeterProps, MeterValueProp, Player, Settings } from '../../@types';
import { Job, MainPaneProp } from '../../@types/index';
import { formatFullName, formatNumber } from '../../lib/Formatter';
import { rgbaToRgbaString } from '../../lib/Color';
import { SettingsContext } from './index';

export const toViewData = (settings: Settings, primaryName: string) => (player: Player) => {
    const isPrimary = player.name === primaryName;
    const name = formatFullName(player.name, settings, isPrimary);
    const color = {
        fg: settings[`${player.role}MeterForegroundColor`],
        bg: settings[`${player.role}MeterBackgroundColor`],
        font: isPrimary ? settings[`${player.role}PrimaryFontColor`] : settings[`${player.role}FontColor`]
    };
    const meterValues: MeterValueProp[] = [
        { key: 'hps', format: settings[`${player.role}HpsFormat`], value: player.hps },
        { key: 'dps', format: settings[`${player.role}DpsFormat`], value: player.dps }
    ];
    const { percent, job } = player;
    return { player: { name, percent, job }, color, meterValues };
};

export const Meters: React.VFC<Pick<MainPaneProp, 'players' | 'primaryName'>> = ({ players, primaryName }) => {
    const [settings] = useContext(SettingsContext);
    const { showJobIcon } = settings;
    const memorizedToViweData = toViewData(settings, primaryName);
    const meters = players.map(player => {
        const viewdata = memorizedToViweData(player);
        return <Meter {...{ ...viewdata, showJobIcon }} key={player.name} />;
    });
    return <ul className='meters'>{meters}</ul>;
};

export const Meter: React.VFC<MeterProps> = ({ player, color, showJobIcon, meterValues }) =>
    <li className='meter'>
        <Bar {...{ percent: player.percent, color }} />
        <OverLayData {...{ player: { name: player.name, job: player.job }, color, showJobIcon, meterValues }} />
    </li>;

export const OverLayData: React.VFC<{
    player: Pick<Player, 'name' | 'job'>,
    showJobIcon: Settings['showJobIcon'],
    color: { font: RgbaColor },
    meterValues: MeterValueProp[],
}> = ({ player, color, showJobIcon, meterValues }) => <div className='overlay' style={{ color: rgbaToRgbaString(color.font) }}>
    <PlayerNamePlate {...{ player, showJobIcon, fontColor: color.font }} />
    <MeterValues {...{ meterValues }} />
</div>;

export const PlayerNamePlate: React.VFC<{
    player: Pick<Player, 'name' | 'job'>,
    showJobIcon: Settings['showJobIcon'],
    fontColor: RgbaColor
}> = ({ player, showJobIcon, fontColor }) => {
    const jobicon = showJobIcon
        ? <JobIcon {...{ job: player.job, fontColor }} />
        : <span style={{ minWidth: '0.2rem' }} />;

    return <div className='layout-row shrink'>
        {jobicon}
        <p className='ellipsis padding'>{player.name}</p>
    </div>;
};

export const JobIcon: React.VFC<{ job: Job, fontColor: RgbaColor }> = ({ job, fontColor }) =>
    <svg className='jobicon padding' style={{ filter: `drop-shadow(0 0 0.03rem ${rgbaToRgbaString(fontColor)})` }}>
        <use xlinkHref={`./public/img/icon/${job}.svg#icon`} />
    </svg>;

export const Bar: React.VFC<{ percent: Player['percent'], color: { fg: RgbaColor, bg: RgbaColor } }> = ({ percent, color }) =>
    <div className='background' style={{ backgroundColor: rgbaToRgbaString(color.bg) }} >
        <div className='foreground' style={{ backgroundColor: rgbaToRgbaString(color.fg), transform: `translateX(calc(${percent} - 100%))` }} />
    </div>;

export const MeterValues: React.VFC<{ meterValues: MeterValueProp[] }> = ({ meterValues }) =>
    <div className='layout-row'>
        {meterValues
            .filter(({ format }) => format !== 'none')
            .map(PartialMeterValue)
            .reduce((acc, c, i) => i === 0 ? c : <>{acc}{GLUE_ELEMENT}{c}</>, <></>)}
    </div>;

export const PartialMeterValue = ({ key, value, format }: MeterValueProp) => {
    const displayValue = formatNumber(value, format);
    switch (key) {
        case 'dps':
            return <div className='padding'>
                <p>{displayValue}</p>
            </div>
        case 'hps':
            return <div className='layout-row padding' style={{ alignItems: 'baseline' }}>
                <p className='pr2'>{displayValue}</p>
                <p style={{ fontSize: '0.7rem' }}>HPS</p>
            </div>;
    }
};

const GLUE_ELEMENT = <div className='padding'>/</div>;