import { useContext } from 'react';
import { AppState } from '../../@types/index';
import { formatNumber } from '../../lib/Formatter';
import { SettingsContext } from './index';

export const Ptdps: React.VFC<Pick<AppState, 'ptdps' | 'active'>> = ({ ptdps, active }) => {
    const [settings] = useContext(SettingsContext);

    if(settings.ptdpsFormat === 'none')
        return <div></div>;

    return <div className='layout-row header_item padding'>
        <i id='ptdps_icon' className={`material-icons pr2 ${active ? 'active' : 'inactive'}`}>local_fire_department</i>
        <p id='ptdps'>{formatNumber(ptdps, settings.ptdpsFormat)}</p>
    </div>
}