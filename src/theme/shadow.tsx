import { Shadows, alpha } from '@mui/material';
import { common, grey } from './palette';

export function shadows(mode: 'light' | 'dark'): Shadows {
    const color = mode === 'light' ? grey[500] : common.black;

    const transparent1 = alpha(color, 0.2);
    const transparent2 = alpha(color, 0.12);
    const transparent3 = alpha(color, 0.16);

    return [
        'none',
        `0px 2px 4px 0px ${transparent1}, 0px 8px 16px -2px ${transparent2}`,
        `0px 4px 10px 0px ${transparent3}`,
        '0px 1px 3px 0px rgba(0,0,0,0.1)',
        '0px 1px 4px 0px rgba(0,0,0,0.1)',
        '0px 2px 4px -1px rgba(0,0,0,0.1)',
        '0px 3px 5px -1px rgba(0,0,0,0.1)',
        '0px 3px 5px -1px rgba(0,0,0,0.1)',
        '0px 4px 5px -2px rgba(0,0,0,0.1)',
        '0px 5px 5px -3px rgba(0,0,0,0.1)',
        '0px 5px 6px -3px rgba(0,0,0,0.1)',
        '0px 6px 6px -3px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',
        '0px 6px 7px -4px rgba(0,0,0,0.1)',

    ];
}