interface Window {
    addOverlayListener?: (event: string, callback: (e: unknown) => void) => void;
    removeOverlayListener?: (event: string, callback: (e: unknown) => void) => void;
    startOverlayEvents?: () => void;
    callOverlayHandler?: ({call}: { call: 'getLanguage' }) => Promise<{language: string}>
}