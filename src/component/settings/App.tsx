import { useEffect } from 'react';
import { saveWindowPosition } from '../../lib/Storage';
import { PaneRouter } from './Router';
import { SideMenu } from './SideMenu';

export const App: React.VFC = () => {
    useEffect(() => {
        window.setInterval(saveWindowPosition, 500);
        return () => {}
    }, []);

    return <>
        <SideMenu />
        <PaneRouter />
    </>
};