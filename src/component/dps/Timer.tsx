import { useContext } from 'react';
import { formatTimestamp } from '../../lib/Formatter';
import { SettingsContext } from './index';

export const Timer: React.VFC<{ duration: number, active: boolean }> = ({ duration, active }) => {
    const [settings] = useContext(SettingsContext);

    if(settings.durationFormat === 'none')
        return <div></div>;

    return <div className='layout-row header_item shrink'>
        <i id='timer' className='material-icons pr2'>{active ? 'timer' : 'timer_off'}</i>
        <p id='timer_value' className='ellipsis'>{formatTimestamp(duration, settings.durationFormat)}</p>
    </div>
}