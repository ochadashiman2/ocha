import { APP_VERSION } from '../lib/Constants';

export const LogoContainer: React.VFC<{}> = () => <>
    <div className='layout-row center'>
        <Logo />
        <h1 className='padding'>Pulse</h1>
    </div>
    <h3>{APP_VERSION}</h3>
</>

export const Logo: React.VFC<{}> = () =>
    <svg className='padding' style={{ width: '28px', height: '28px' }} viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='m2.6 25h10.9l6.5-15 10 30 6.5-15h10.9'
            fill='none'
            stroke='#ffffff'
            strokeLinecap='round'
            strokeWidth='5'
        />
    </svg>;