import { AppState, CombatData, Player } from '../@types';
import { INITIAL_APPSTATE } from './Constants';
import { getBattleRole, getJob } from './Job';

export const indeterminateFormList = ['∞', 'NaN', '---'];
export const toInt = (numeric: string) => indeterminateFormList.includes(numeric)
    ? 0 : Number.parseInt(numeric);

const getPlayerData = (combatant: CombatData['Combatant']) => (name: string) => {
    const job = getJob(combatant[name]['Job']);
    const role = getBattleRole(job);
    const dps = toInt(combatant[name]['ENCDPS']);
    const hps = toInt(combatant[name]['ENCHPS']);
    return { name, dps, hps, job, role };
};

const sortByDps = (a: Pick<Player, 'dps'>, b: Pick<Player, 'dps'>) => b.dps - a.dps;

const addPercent = (maxDPS: number) => (omitted: Omit<Player, 'percent'>): Player => {
    const percent = maxDPS === 0 ? '0%' : `${(omitted.dps / maxDPS) * 100}%`
    return ({ ...omitted, percent});
}

export const combatDataParser = (e: CombatData, primaryName: string = 'YOU'): AppState => {
    if (Object.keys(e.Combatant).length === 0)
        return INITIAL_APPSTATE;

    const { YOU, ...others } = e.Combatant;
    const combatant = YOU !== undefined
        ? { [primaryName]: YOU, ...others }
        : e.Combatant;

    const omittedPlayers = Object.keys(combatant)
        .map(getPlayerData(combatant))
        .sort(sortByDps);

    const [{ dps: maxDPS }, ..._] = omittedPlayers;
    const players = omittedPlayers.map(addPercent(maxDPS));
    const ptdps = toInt(e.Encounter['ENCDPS']);
    const pthps = toInt(e.Encounter['ENCHPS']);
    const duration = toInt(e.Encounter['DURATION']);
    const active = e.isActive === 'true';

    return { duration, ptdps, pthps, players, active, ready: true };
};