import { NumberFormatKeys } from '../../@types';
import { CheckBox } from './ui/CheckBox';
import { ToggleSelector } from './ui/ToggleSelector';

export const JobLabel: React.VFC<{}> = () =>
    <div className='layout-row center'>
        <label>TANK</label>
        <label>HEALER</label>
        <label>DPS</label>
        <label>その他</label>
    </div>

export const NameFormat: React.VFC<{}> = () => {
    return <div>
        <ToggleSelector {...{
            name: 'firstNameFormat',
            states: {
                long: { display: 'Fisrt', next: 'short' },
                short: { display: 'F.', next: 'none' },
                none: { display: '-', next: 'long' },
            }
        }} />
        <ToggleSelector {...{
            name: 'lastNameFormat',
            states: {
                long: { display: 'Last', next: 'short' },
                short: { display: 'L.', next: 'none' },
                none: { display: '-', next: 'long' },
            }
        }} />
    </div>;
};

export const TimestampFormat: React.VFC<{}> = () => {
    return <ToggleSelector {...{
        name: 'durationFormat',
        states: {
            'mm:ss': { display: 'mm:ss', next: 'ssss' },
            'ssss': { display: 'seconds', next: 'none' },
            'none': { display: '-', next: 'mm:ss' }
        }
    }} />;
};

export const ShowJobIcon: React.VFC<{}> = () => <CheckBox {...{ name: 'showJobIcon' }} />;
export const PtdpsFormat: React.VFC<{}> = () => <NumberFormatSelector {...{ name: 'ptdpsFormat' }} />;
export const PthpsFormat: React.VFC<{}> = () => <NumberFormatSelector {...{ name: 'pthpsFormat' }} />;

export const DpsFormat: React.VFC<{}> = () => {
    const formatNameList = ['tankDpsFormat', 'healerDpsFormat', 'dpsDpsFormat', 'othersDpsFormat'] as const;
    return <div>
        <JobLabel />
        <div className='layout-row center'>
            {formatNameList.map(name => <NumberFormatSelector {...{ name }} key={name} />)}
        </div>
    </div>
};

export const HpsFormat: React.VFC<{}> = () => {
    const formatNameList = ['tankHpsFormat', 'healerHpsFormat', 'dpsHpsFormat', 'othersHpsFormat'] as const;
    return <div>
        <JobLabel />
        <div className='layout-row center'>
            {formatNameList.map(name => <NumberFormatSelector {...{ name }} key={name} />)}
        </div>
    </div>
};

export const NumberFormatSelector: React.VFC<{ name: NumberFormatKeys }> = ({ name }) =>
    <ToggleSelector {...{
        name,
        states: {
            'full': { display: 'Full', next: '0.1k' },
            '0.1k': { display: '0.1k', next: '1k' },
            '1k': { display: '1k', next: 'none' },
            'none': { display: '-', next: 'full' }
        }
    }} />;