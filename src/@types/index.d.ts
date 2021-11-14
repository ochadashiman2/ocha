import { LANG_TYPE, JOB_TYPE } from '../lib/Constants';
import { RgbaColor } from "react-colorful";
import { ToggleSelector, PtdpsFormat } from '../component/settings/FormatSettings';

/** STATE */
export type AppState = {
    duration: number,
    ptdps: number,
    pthps: number,
    active: boolean,
    ready: boolean,
    players: Player[],
};

export type MainPaneProp = AppState & {
    primaryName: string,
    showMessage: boolean;
    setShowMessage: (flag: boolean) => void;
    openWindow: <T extends HTMLElement>(event: React.MouseEvent<T, MouseEvent>) => void,
};

/** ACT */
export type BattleRole = 'tank' | 'healer' | 'dps' | 'others';
export type CraftRole = 'crafter' | 'gatherer' | 'others';
export type Role = BattleRole | CraftRole;
export type Job = typeof JOB_TYPE[keyof typeof JOB_TYPE][number];

export type Player = {
    name: string,
    role: BattleRole
    job: Job
    dps: number,
    hps: number,
    percent: string,
};

export type ActApi = (parser?: (e: CombatData, primaryName: string) => AppState) => {
    primaryName: string;
    alreadyInit: boolean;
    appState: AppState;
};

export type Zone = string;

export type LogLine = {
    line: string[],
    rawLine: string
}

export type ImportedLogLines = {
    logLines: string[]
}

export type ChangeZone = {
    zoneID: number,
    zoneName: Zone
}

export type ChangePrimaryPlayer = {
    charID: number
    charName: string
}

export type OverlayStateUpdate = {
    detail: { isLocked: boolean }
};

export type CombatData = {
    isActive: 'true' | 'false';
    Combatant: {
        [key: string]: {
            'Job': Job,
            'ENCDPS': string,
            'ENCHPS': string,
        }
    }
    Encounter: {
        'ENCDPS': string,
        'ENCHPS': string,
        'DURATION': string,
    }
}

/** Settings */
export type Settings = {
    hideOthersName: boolean,
    hideOverlayAfterCombatEnd: boolean,
    hideOverlayAt: number,
    outputLogOnConsole: boolean,
    overlayVerticalAlign: VerticalAlignType,

    /** format */
    durationFormat: TimestampFormatType,
    firstNameFormat: NameFormatType,
    lastNameFormat: NameFormatType,
    showJobIcon: boolean,
    ptdpsFormat: NumberFormatType,
    pthpsFormat: NumberFormatType,
    tankDpsFormat: NumberFormatType,
    healerDpsFormat: NumberFormatType,
    dpsDpsFormat: NumberFormatType,
    othersDpsFormat: NumberFormatType,
    tankHpsFormat: NumberFormatType,
    healerHpsFormat: NumberFormatType,
    dpsHpsFormat: NumberFormatType,
    othersHpsFormat: NumberFormatType,

    /** color */
    tankMeterForegroundColor: RgbaColor,
    tankMeterBackgroundColor: RgbaColor,
    tankFontColor: RgbaColor,
    tankPrimaryFontColor: RgbaColor,

    healerMeterForegroundColor: RgbaColor,
    healerMeterBackgroundColor: RgbaColor,
    healerFontColor: RgbaColor,
    healerPrimaryFontColor: RgbaColor,

    dpsMeterForegroundColor: RgbaColor,
    dpsMeterBackgroundColor: RgbaColor,
    dpsFontColor: RgbaColor,
    dpsPrimaryFontColor: RgbaColor,

    othersMeterForegroundColor: RgbaColor,
    othersMeterBackgroundColor: RgbaColor,
    othersFontColor: RgbaColor,
    othersPrimaryFontColor: RgbaColor,
};

export type PickSettingsKeys<T> = {
    [P in keyof Settings]: Settings[P] extends T ? P : never;
}[keyof Settings];

export type VerticalAlignType = 'flex-start' | 'flex-end';
export type TimestampFormatType = 'mm:ss' | 'ssss' | 'none';
export type NumberFormatType = 'full' | '0.1k' | '1k' | 'none';
export type NameFormatType = 'long' | 'short' | 'none';

export type NumberFormatKeys = PickSettingsKeys<NumberFormatType>
export type ColorTypeKeys = PickSettingsKeys<RgbaColor>;

export type MeterValueProp = { key: 'dps' | 'hps', format: NumberFormatType, value: number };

export type SelectorProps<T extends keyof Settings> = {
    name: T,
    states: { [P in Settings[T]]: { display: string, next: Settings[T] } }
};

export type MeterProps = {
    player: Pick<Player, 'name' | 'job' | 'percent'>,
    color: { fg: RgbaColor, bg: RgbaColor, font: RgbaColor },
    showJobIcon: Settings['showJobIcon']
    meterValues: MeterValueProp[]
};

export type SettingsContextType = [
    value: Settings,
    setValue: React.Dispatch<React.SetStateAction<Settings>>
];

/** LANG */
export type Langtype = (typeof LANG_TYPE)[number]['language'];

export type MessageStore = {
    [x: string]: {
        [p in Langtype]: string
    }
};

export type Message = {
    setting: MessageStore
};

/** COLOR */
type RgbaString = string;