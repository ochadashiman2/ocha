import React from 'react';
import { ActApi } from '../../@types/index';
import { useSettingsWindow } from '../../hooks/useSettingsWindow';
import { Header } from './Header';
import { InitialMessage } from './InitialMessage';
import { Meters } from './Meters';
import { SettingMessageOverLay } from './SettingMessageOverLay';

export const OverLayContainer: React.VFC<{ useActApi: ActApi }> = ({ useActApi }) => {
    const { primaryName, alreadyInit, appState: { players, ready, ...headerProps } } = useActApi();
    const { openWindow, showMessage, setShowMessage } = useSettingsWindow();

    if (!ready)
        return <span className='fadein' key={'not-ready'}>
            <InitialMessage {...{ openWindow, showMessage: !alreadyInit }} />
        </span>;

    return <span className='fadein' onMouseOver={() => setShowMessage(true)} key={'ready'}>
        <div className={`blur ${showMessage ? 'enable' : ''}`}>
            <Header {...headerProps} />
            <Meters {...{ players, primaryName }} />
        </div>
        <SettingMessageOverLay {...{ openWindow, showMessage, setShowMessage }} />
    </span>;
}

