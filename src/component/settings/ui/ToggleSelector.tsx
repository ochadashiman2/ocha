import { SelectorProps } from "../../../@types";
import { useSetSettings } from "../../../hooks/useSetSettings";
import { Settings } from '../../../@types/index';

export const ToggleSelector = <T extends keyof Settings>({ name, states }: SelectorProps<T>) => {
    const { value, setSettings, pushSettings } = useSetSettings(name);
    return <input
        id={name}
        type='button'
        value={states[value].display}
        onClick={() => {
            const newValue = states[value].next
            setSettings(newValue);
            pushSettings(newValue);
        }}
    />
};