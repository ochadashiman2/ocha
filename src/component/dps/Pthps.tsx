import { useContext } from 'react';
import { AppState } from '../../@types/index';
import { formatNumber } from '../../lib/Formatter';
import { SettingsContext } from './index';

export const Pthps: React.VFC<Pick<AppState, 'pthps' | 'active'>> = ({ pthps, active }) => {
    const [settings] = useContext(SettingsContext);

    if(settings.pthpsFormat === 'none')
        return <div></div>;

    return <div className='layout-row header_item padding'>
        <i id='pthps_icon' className={`material-icons pr2 ${active ? 'active' : 'inactive'}`}>health_and_safety</i>
        <p id='pthps'>{formatNumber(pthps, settings.pthpsFormat)}</p>
    </div>
}