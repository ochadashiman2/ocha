import { APP_VERSION } from '../lib/Constants';

export const LogoContainer: React.VFC<{}> = () => <>
    <div className='layout-row center'>
        <Logo />
        <h1 className='padding'>Pulse</h1>
    </div>
    <h3>{APP_VERSION}</h3>
</>

export const Logo: React.VFC<{}> = () =>
    <svg className='padding' style={{ width: '28px', height: '28px' }}>
        <use xlinkHref={`./public/img/logo.svg#logo`} />
    </svg>;