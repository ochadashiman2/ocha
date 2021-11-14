import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { About } from './About';
import { ExportSettings } from './Export';
import { DpsFormat, HpsFormat, NameFormat, PtdpsFormat, PthpsFormat, ShowJobIcon, TimestampFormat } from './FormatSettings';
import { HideOthersName, HideOverlayAfterCombatEnd, HideOverlayAt, OutputLogOnConsole, OverLayVerticalAlign, ResetSettings } from './GeneralSettings';
import { Pane } from './Pane';
import { ColorPickerList } from './StyleSettings';

export const PaneRouter = () =>
    <HashRouter>
        <Switch>
            <Route
                path='/general'
                render={() => Pane({
                    title: 'General',
                    settingItemList: [
                        { label: '自分以外の名前を隠す', item: <HideOthersName /> },
                        { label: '戦闘終了後に非表示にする', item: <HideOverlayAfterCombatEnd /> },
                        { label: '非表示にするまでの秒数', item: <HideOverlayAt /> },
                        { label: 'コンソールへログを出力する', item: <OutputLogOnConsole /> },
                        { label: '設定をリセットする', item: <ResetSettings /> },
                    ]
                })}
                exact
            />
            <Route
                path='/format'
                render={() => Pane({
                    title: 'Format',
                    settingItemList: [
                        { label: '戦闘時間の形式', item: <TimestampFormat /> },
                        { label: 'PTHPSの形式', item: <PthpsFormat /> },
                        { label: 'PTDPSの形式', item: <PtdpsFormat /> },
                        { label: 'ジョブアイコン', item: <ShowJobIcon /> },
                        { label: '名前の形式', item: <NameFormat /> },
                        { label: 'DPSの形式', item: <DpsFormat /> },
                        { label: 'HPSの形式', item: <HpsFormat /> },
                    ]
                })}
                exact
            />
            <Route
                path='/style'
                render={() => Pane({
                    title: 'Style',
                    settingItemList: [
                        { label: 'オーバーレイの位置', item: <OverLayVerticalAlign /> },
                        {
                            label: 'TANKの色',
                            item: <ColorPickerList {...{
                                colorTypeKeysList: ['tankMeterForegroundColor', 'tankMeterBackgroundColor', 'tankPrimaryFontColor', 'tankFontColor']
                            }} />,
                            type: 'column',
                        },
                        {
                            label: 'HEALERの色',
                            item: <ColorPickerList {...{
                                colorTypeKeysList: ['healerMeterForegroundColor', 'healerMeterBackgroundColor', 'healerPrimaryFontColor', 'healerFontColor']
                            }} />,
                            type: 'column',
                        },
                        {
                            label: 'DPSの色',
                            item: <ColorPickerList {...{
                                colorTypeKeysList: ['dpsMeterForegroundColor', 'dpsMeterBackgroundColor', 'dpsPrimaryFontColor', 'dpsFontColor']
                            }} />,
                            type: 'column',
                        },
                        {
                            label: 'その他の色',
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
                        { label: 'Export', item: <ExportSettings /> }
                    ]
                })}
                exact
            />
            <Route path='/about' component={About} exact />
            <Redirect to='/general' />
        </Switch>
    </HashRouter>;
