import { BattleRole, Job, Role } from '../@types';
import { isJob } from '../typeguard';
import { JOB_TYPE } from './Constants';

export const getJob = (maybeJob: string | undefined): Job => {
    const job = maybeJob?.toUpperCase()
    if (!isJob(job))
        return 'unknown';
    return job;
}

export const getBattleRole = (job: Job): BattleRole => {
    const role = getRole(job);
    if (role === 'crafter')
        return 'others';
    if (role === 'gatherer')
        return 'others';
    return role;
}

export const getRole = (job: Job): Role => {
    if ((JOB_TYPE.tank as Readonly<string[]>).includes(job)) {
        return 'tank';
    }
    if ((JOB_TYPE.healer as Readonly<string[]>).includes(job)) {
        return 'healer';
    }
    if ((JOB_TYPE.dps as Readonly<string[]>).includes(job)) {
        return 'dps';
    }
    if ((JOB_TYPE.crafter as Readonly<string[]>).includes(job)) {
        return 'crafter';
    }
    if ((JOB_TYPE.gatherer as Readonly<string[]>).includes(job)) {
        return 'gatherer';
    }
    return 'others';
}
