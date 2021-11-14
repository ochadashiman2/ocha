import { LogoContainer } from "../Logo";

export const InitialMessage: React.VFC<{
    showMessage: boolean;
    openWindow: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}> = ({ showMessage, openWindow }) => <div
    className={`setting_message view ${showMessage ? 'show' : ''}`}
    onDoubleClick={openWindow}
>
    <LogoContainer />
    <ul className='ul_items'>
        <li className='list_item'>Unlock overlay to turn on settings mode</li>
        <li className='list_item'>Double-click to open settings window (required to disable click-through)</li>
    </ul>
</div>;
