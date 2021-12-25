import { Settings, NumberFormatType, TimestampFormatType } from "../@types";
import { NameFormatType } from '../@types/index';

export const formatter1 = new Intl.NumberFormat('ja', {
    useGrouping: true,
});

export const formatter2 = new Intl.NumberFormat('ja', {
    useGrouping: true,
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
});

export const PetNameRX = /^[a-zA-Z-]{1,10}\s\([a-zA-Z\s'-]+\)$/;

export const padZero = (n: number, digit: number) => {
    return n.toString(10).padStart(digit, '0').slice(-digit);
}

export const primaryNameFormatter = (isPrimary: boolean) => (name: string) => {
    if (!isPrimary)
        return name;
    if (name === 'You')
        return 'Your Name'
    return name;
};

export const hideOthersNameFormatter = (isPrimary: boolean, hideOthersName: boolean) => (name: string) => {
    if (isPrimary)
        return name;
    if (hideOthersName)
        return ''
    return name;
};

export const petNameFomatter = (name: string) => {
    const [firstName] = name.split(' ');
    const isPet = PetNameRX.test(name);
    if (isPet)
        return firstName;
    return name;
}

export const nameFormatFomatter = (first: NameFormatType, last: NameFormatType) => (name: string) => {
    const [firstName, lastName] = name.split(' ');
    const isValidFormat = firstName !== undefined && lastName !== undefined;
    if (!isValidFormat)
        return name;
    return [{ name: firstName, format: first }, { name: lastName, format: last }]
        .map(({name, format}) => formatName(name, format))
        .join('\u0020')
        .trim();
};

export const formatName = (name: string, format: NameFormatType) => {
    switch (format) {
        case 'long':
            return name;
        case 'short':
            return `${name[0]}.`
        case 'none':
            return '';
    }
}

export const formatFullName = (name: string, settings: Settings, isPrimary: boolean) => {
    const formatterList = [
        primaryNameFormatter(isPrimary),
        hideOthersNameFormatter(isPrimary, settings.hideOthersName),
        petNameFomatter,
        nameFormatFomatter(settings.firstNameFormat, settings.lastNameFormat)
    ]
    return formatterList.reduce((acc, filter) => filter(acc), name);
};

export const formatNumber = (num: number, format: NumberFormatType) => {
    switch (format) {
        case 'full':
            return formatter1.format(num);
        case '0.1k':
            return `${formatter2.format(Math.round(num / 100) / 10)}k`;
        case '1k':
            return `${formatter1.format(Math.round(num / 1000))}k`;
        case 'none':
            return '';
    }  
};

export const formatTimestamp = (duration: number, format: TimestampFormatType) => {
    switch (format) {
        case 'ssss':
            return `${duration.toString(10)}s`;
        case 'mm:ss':
            const mm = padZero(Math.floor(duration / 60), 2);
            const ss = padZero(duration % 60, 2);
            return `${mm}:${ss}`;
        case 'none':
            return '';
    }
};