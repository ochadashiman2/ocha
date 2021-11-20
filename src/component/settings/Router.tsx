import { useTranslation } from 'react-i18next';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { About } from './About';
import { ExportSettings } from './Export';
import { DpsFormat, HpsFormat, NameFormat, PtdpsFormat, PthpsFormat, ShowJobIcon, TimestampFormat } from './FormatSettings';
import { HideOthersName, HideOverlayAfterCombatEnd, HideOverlayAt, OutputLogOnConsole, OverLayVerticalAlign, ResetSettings } from './GeneralSettings';
import { Pane } from './Pane';
import { ColorPickerList } from './StyleSettings';

export const PaneRouter = () => {
    const {t} = useTranslation();
    return <HashRouter>
        <Switch>
            <Route
                path='/general'
                render={() => Pane({
                    title: 'General',
                    settingItemList: [
                        { label: t('hideOtherPlayerNames'), item: <HideOthersName /> },
                        { label: t('hideOverlayAfterCombatEnd'), item: <HideOverlayAfterCombatEnd /> },
                        { label: t('hideOverlayAt'), item: <HideOverlayAt /> },
                        { label: t('outputLogOnConsole'), item: <OutputLogOnConsole /> },
                        { label: t('resetSettings'), item: <ResetSettings /> },
                    ]
                })}
                exact
            />
            <Route
                path='/format'
                render={() => Pane({
                    title: 'Format',
                    settingItemList: [
                        { label: t('timestampFormat'), item: <TimestampFormat /> },
                        { label: t('pthpsFormat'), item: <PthpsFormat /> },
                        { label: t('ptdpsFormat'), item: <PtdpsFormat /> },
                        { label: t('showJobIcon'), item: <ShowJobIcon /> },
                        { label: t('nameFormat'), item: <NameFormat /> },
                        { label: t('dpsFormat'), item: <DpsFormat /> },
                        { label: t('hpsFormat'), item: <HpsFormat /> },
                    ]
                })}
                exact
            />
            <Route
                path='/style'
                render={() => Pane({
                    title: 'Style',
                    settingItemList: [
                        { label: t('overLayVerticalAlign'), item: <OverLayVerticalAlign /> },
                        {
                            label: t('tankColor'),
                            item: <ColorPickerList {...{
                                colorTypeKeysList: ['tankMeterForegroundColor', 'tankMeterBackgroundColor', 'tankPrimaryFontColor', 'tankFontColor']
                            }} />,
                            type: 'column',
                        },
                        {
                            label: t('healerColor'),
                            item: <ColorPickerList {...{
                                colorTypeKeysList: ['healerMeterForegroundColor', 'healerMeterBackgroundColor', 'healerPrimaryFontColor', 'healerFontColor']
                            }} />,
                            type: 'column',
                        },
                        {
                            label: t('dpsColor'),
                            item: <ColorPickerList {...{
                                colorTypeKeysList: ['dpsMeterForegroundColor', 'dpsMeterBackgroundColor', 'dpsPrimaryFontColor', 'dpsFontColor']
                            }} />,
                            type: 'column',
                        },
                        {
                            label: t('othersColor'),
                            item: <ColorPickerList {...{
                                colorTypeKeysList: ['othersMeterForegroundColor', 'othersMeterBackgroundColor', 'othersPrimaryFontColor', 'othersFontColor']
                            }} />,
                            type: 'column',
                        },
                    ]
                })}
                exact
            />
            <Route
                path='/import_export'
                render={() => Pane({
                    title: 'Import/Export',
                    settingItemList: [
                        { label: t('exportSettings'), item: <ExportSettings /> }
                    ]
                })}
                exact
            />
            <Route path='/about' component={About} exact />
            <Redirect to='/general' />
        </Switch>
    </HashRouter>;
}
