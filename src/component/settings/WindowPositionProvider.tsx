import { useEffect } from "react";
import { saveWindowPosition } from "../../lib/Storage";

export const WindowPositionProvider: React.VFC<{ children: JSX.Element }> = ({ children }) => {
    useEffect(() => {
        const id = window.setInterval(saveWindowPosition, 500);
        return () => window.clearInterval(id);
    }, []);

    return children;
};