import { useContext } from "react";
import { SettingsContext } from "./index";

export const AlignContainer: React.VFC<{ children: JSX.Element }> = ({ children }) => {
    const [settings] = useContext(SettingsContext);
    return <div className='overlay-container' style={{ justifyContent: settings.overlayVerticalAlign }}>{children}</div>;
}