import { useContext } from "react";
import { SettingsContext } from ".";

export const ExportSettings: React.VFC<{}> = () => {
    const [value] = useContext(SettingsContext);
    return <textarea
        value={JSON.stringify(value)}
        className="export_settings"
        readOnly={true}
        maxLength={2000}
    />
};