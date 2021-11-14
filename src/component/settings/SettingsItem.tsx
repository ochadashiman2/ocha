export const SettingsItem: React.VFC<{ label: string, item: JSX.Element, type?: 'row' | 'column'  }> = ({ label, item, type = 'row' }) =>
    <div className='settings_item' key={label} style={{flexDirection: type}}>
        <label>{label}</label>
        {item}
    </div>;