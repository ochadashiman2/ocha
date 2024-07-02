import { AppState, Settings } from '../@types';

export const INITIAL_APPSTATE: AppState = {
    duration: 0,
    ptdps: 0,
    pthps: 0,
    active: false,
    ready: false,
    players: []
}

export const SETTING_APP_STATE: AppState = {
    duration: 516,
    ptdps: 89454,
    pthps: 16570,
    active: true,
    ready: true,
    players: [
        {
            name: 'Moe Nyan',
            dps: 15819,
            hps: 0,
            job: 'RPR',
            role: 'dps',
            percent: '100%'
        },
        {
            name: 'Mike Cat',
            dps: 14687,
            hps: 0,
            job: 'NIN',
            role: 'dps',
            percent: '92.84%'
        },
        {
            name: 'Mya- Mya-',
            dps: 14631,
            hps: 0,
            job: 'RDM',
            role: 'dps',
            percent: '92.49%'
        },
        {
            name: 'Nyan Ko',
            dps: 13240,
            hps: 132,
            job: 'DNC',
            role: 'dps',
            percent: '87.70%'
        },
        {
            name: 'Miko Neco',
            dps: 9797,
            hps: 69,
            job: 'DRK',
            role: 'tank',
            percent: '61.93%'
        },
        {
            name: 'Catzzz Zz',
            dps: 9698,
            hps: 0,
            job: 'GNB',
            role: 'tank',
            percent: '61.31%'
        },
        {
            name: 'Chat Noir',
            dps: 7020,
            hps: 12654,
            job: 'SGE',
            role: 'healer',
            percent: '44.38%'
        },
        {
            name: "Hime' Nyan'Nyan",
            dps: 4559,
            hps: 3853,
            job: 'AST',
            role: 'healer',
            percent: '28.82%'
        },
        {
            name: "Chochoco (Hime' Nyan'Nyan)",
            dps: 1103,
            hps: 0,
            job: 'unknown',
            role: 'others',
            percent: '6.97%'
        },
        {
            name: "Limit Break",
            dps: 896,
            hps: 0,
            job: 'LIMIT BREAK',
            role: 'others',
            percent: '5.66%'
        },
    ]
};

export const LOCAL_STORAGE_KEY = 'ocha-overlay.settings';
export const LOCAL_WINDOWFEATURES_KEY = 'ocha-overlay.windowPosition';
export const LOCAL_LANGUAGE_KEY = 'ocha-overlay.language';

export const DEFAULT_SETTINGS: Settings = {
    hideOthersName: false,
    hideOverlayAfterCombatEnd: true,
    hideOverlayAt: 30,
    outputLogOnConsole: false,
    overlayVerticalAlign: 'flex-start',

    durationFormat: 'mm:ss',

    ptdpsFormat: 'full',
    tankDpsFormat: 'full',
    healerDpsFormat: 'full',
    dpsDpsFormat: 'full',
    othersDpsFormat: 'full',

    pthpsFormat: '0.1k',
    tankHpsFormat: 'none',
    healerHpsFormat: '0.1k',
    dpsHpsFormat: 'none',
    othersHpsFormat: 'none',

    firstNameFormat: 'long',
    lastNameFormat: 'long',
    showJobIcon: true,

    tankMeterForegroundColor: { r: 82, g: 82, b: 255, a: 0.85 },
    tankMeterBackgroundColor: { r: 0, g: 0, b: 0, a: 0.50 },
    tankFontColor: { r: 255, g: 255, b: 255, a: 1.00 },
    tankPrimaryFontColor: { r: 255, g: 238, b: 0, a: 1.00 },

    healerMeterBackgroundColor: { r: 0, g: 0, b: 0, a: 0.50 },
    healerMeterForegroundColor: { r: 25, g: 251, b: 138, a: 0.85 },
    healerFontColor: { r: 255, g: 255, b: 255, a: 1.00 },
    healerPrimaryFontColor: { r: 255, g: 238, b: 0, a: 1.00 },

    dpsMeterForegroundColor: { r: 255, g: 82, b: 82, a: 0.85 },
    dpsMeterBackgroundColor: { r: 0, g: 0, b: 0, a: 0.50 },
    dpsFontColor: { r: 255, g: 255, b: 255, a: 1.00 },
    dpsPrimaryFontColor: { r: 255, g: 238, b: 0, a: 1.00 },

    othersMeterForegroundColor: { r: 81, g: 81, b: 81, a: 0.85 },
    othersMeterBackgroundColor: { r: 0, g: 0, b: 0, a: 0.50 },
    othersFontColor: { r: 255, g: 255, b: 255, a: 1.00 },
    othersPrimaryFontColor: { r: 255, g: 238, b: 0, a: 1.00 },
}

export const DEFAULT_WINDOWPOSITION = 'left=50,top=50,width=1000,height=700';

export const JOB_TYPE = {
    tank: ['WAR', 'DRK', 'PLD', 'GNB', 'MRD', 'GLA'],
    healer: ['WHM', 'SCH', 'AST', 'SGE', 'CNJ'],
    dps: [
        'MNK', 'NIN', 'DRG', 'SAM', 'RPR', 'BLM', 'SMN', 'RDM', 'BRD', 'MCH', 'DNC',
        'ROG', 'LNC', 'PGL', 'THM', 'ACN', 'ARC', 'BLU'
    ],
    crafter: ['CRP', 'BSM', 'ARM', 'GSM', 'LTW', 'WVR', 'ALC', 'CUL'],
    gatherer: ['MIN', 'BTN', 'FSH'],
    others: ['LIMIT BREAK', 'unknown'],
} as const;

export const APP_VERSION = 'v1.0.0';