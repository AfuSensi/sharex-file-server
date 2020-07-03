import { createHash } from 'crypto';

export function mathClamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max);
}

export const getRandomInt = (): number => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export function md5(data: string): string {
    return createHash('md5').update(data).digest('hex');
}

export function toUNIX(date: Date): number {
    return toFixedNumber(date.getTime() / 1000, 0);
}

export function toFixedNumber(num: number, precision: number): number {
    return +(+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}

export function stripFileExtension(fileName: string): string {
    return fileName.replace(/\.[^/.]+$/, '');
}

export function getFileExtension(fileName: string): string {
    const ext = fileName.match(/\.[^/.]+$/);
    if (!ext) throw 'Invalid file extension';
    return ext[0];
}
