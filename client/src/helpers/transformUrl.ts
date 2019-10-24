import {keys} from 'lodash';

export function transformUrl(url: string, params: { [key: string]: string | number }): string {
    const modifiedKeys = keys(params).map((key: string) => `{{${key}}}`);
    const reg = new RegExp(modifiedKeys.join('|'), 'g');

    return url.replace(reg, (matched: string): string => {
        const key: RegExpMatchArray | null = matched.match(/{{(.*)}}/);

        if (key) return params[key[1]] as string;

        return '';
    });
}