import { PickSettingsKeys } from "../../../@types";
import { useSetSettings } from "../../../hooks/useSetSettings";

export const CheckBox: React.VFC<{name: PickSettingsKeys<boolean>}> = ({name}) => {
    const { value, setSettings, pushSettings } = useSetSettings(name);
    return <input
        type='checkbox'
        checked={value}
        onChange={e => {
            setSettings(e.target.checked);
            pushSettings(e.target.checked);
        }}
    />;
}
