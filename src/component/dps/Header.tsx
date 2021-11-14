import { Ptdps } from './Ptdps';
import { Timer } from './Timer';
import { AppState } from '../../@types/index';
import { Pthps } from './Pthps';

export const Header: React.VFC<Pick<AppState, 'duration' | 'ptdps' | 'pthps' | 'active'>> = ({ duration, ptdps, pthps, active }) =>
    <header className={`party ${active ? 'active' : 'inactive'}`}>
        <Timer {...{ duration, active }} />
        <div className='layout-row'>
            <Pthps {...{ pthps, active }} />
            <Ptdps {...{ ptdps, active }} />
        </div>
    </header>;