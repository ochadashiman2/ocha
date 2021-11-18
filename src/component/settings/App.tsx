import { PaneRouter } from './Router';
import { SideMenu } from './SideMenu';
import { TranslationProvider } from './TranslationProvider';
import { WindowPositionProvider } from './WindowPositionProvider';

export const App: React.VFC = () =>
    <TranslationProvider>
        <WindowPositionProvider>
            <>
                <SideMenu />
                <PaneRouter />
            </>
        </WindowPositionProvider>
    </TranslationProvider>;