import { SettingsItem } from './SettingsItem';

export const Pane: React.VFC<{ title: string, settingItemList: ({ label: string, item: JSX.Element , type?: 'row' | 'column' })[] }> = ({ title, settingItemList }) =>
    <div className='pane'>
        <h2 style={{ paddingBottom: '1rem' }}>{title}</h2>
        <section>
            {settingItemList.map(SettingsItem)}
        </section>
    </div>;