import { createContext, useState } from 'react';
import { render } from 'react-dom';
import { SettingsContextType } from '../../@types';
import { DEFAULT_SETTINGS } from '../../lib/Constants';
import { loadSettings } from '../../lib/Storage';
import { App } from './App';

export const SettingsContext = createContext<SettingsContextType>([DEFAULT_SETTINGS, (_) => { }]);

const Index = () => {
    const settings = useState(loadSettings());
    return <SettingsContext.Provider value={settings}>
        <App/>
    </SettingsContext.Provider>;
};

render(<Index />, document.getElementById('app'));