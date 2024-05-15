import { red } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
    interface TypeBackground {
        neutral: string;
    }
    interface SimplePaletteColorOptions {
        lighter: string;
        darker: string;
    }
    interface PaletteColor {
        lighter: string;
        darker: string;
    }
}

export const primary = {
    lighter: '#EBF3FE',
    light: '#4570EA',
    main: '#5D87FF',
    dark: '#4570EA',
    darker: '#333B54',
    contrastText: '#FFFFFF',
};

export const secondary = {
    lighter: '#ECF2FF',
    main: '#34A1DE',
    dark: '#1C455D',
    darker: '#49BEFF',
    contrastText: '#FFFFFF',
};

export const grey = {
    0: '#FFFFFF',
    50: '#EAEFF4',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE5EF',
    400: '#C4CDD5',
    500: '#919EAB',
    550: '#7C8FAC',
    600: '#637381',
    700: '#5A6A85',
    800: '#212B36',
    900: '#161C24',
};

export const warning = {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: grey[800],
};

export const success = {
    lighter: '#E6FFFA',
    light: '#13DEB9',
    main: '#22C55E',
    dark: '#118D57',
    darker: '#065E49',
    contrastText: '#ffffff',
};

export const error = {
    lighter: '#FBF2EF',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#FFFFFF',
};

export const common = {
    black: '#000000',
    white: '#FFFFFF',
};

export const action = {
    hover: alpha(grey[500], 0.08),
    asynchronousselected: alpha(grey[500], 0.16),
    disabled: alpha(grey[500], 0.8),
    disabledBackground: alpha(grey[500], 0.24),
    focus: alpha(grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
};

const base = {
    primary,
    secondary,
    success,
    warning,
    error,
    grey,
    common,
    divider: alpha(grey[500], 0.2),
    action,
};



export function palette(mode: 'light' | 'dark') {
    const light = {
        ...base,
        mode: 'light',
        primary,
        secondary,
        background: {
            paper: '#FFFFFF',
            default: '#FFFFFF',
            neutral: grey[200],
        },
        info: {
            lighter: '#CAFDF5',
            light: '#61F3F3',
            main: '#00B8D9',
            dark: '#006C9C',
            darker: '#003768',
            contrastText: '#FFFFFF',
        },
        success: {
            lighter: '#D3FCD2',
            light: '#77ED8B',
            main: '#22C55E',
            dark: '#118D57',
            darker: '#065E49',
            contrastText: '#ffffff',
        },
        warning: {
            lighter: '#FFF5CC',
            light: '#FFD666',
            main: '#FFAB00',
            dark: '#B76E00',
            darker: '#7A4100',
            contrastText: grey[800],
        },
        error: {
            lighter: '#FFE9D5',
            light: '#FFAC82',
            main: '#FF5630',
            dark: '#B71D18',
            darker: '#7A0916',
            contrastText: '#FFFFFF',
        },
        grey,
        common: {
            black: '#000000',
            white: '#FFFFFF',
        },
        divider: alpha('#919EAB', 0.2),
        action: {
            ...base.action,
            hover: alpha('#919EAB', 0.08),
            asynchronousselected: red,
            disabled: alpha('#919EAB', 0.8),
            disabledBackground: alpha('#919EAB', 0.24),
            focus: alpha('#919EAB', 0.24),
            hoverOpacity: 0.08,
            disabledOpacity: 0.48,
        },
    };

    const dark = {
        ...base,
        mode: 'dark',
        primary,
        secondary,
        info: {
            lighter: '#CAFDF5',
            light: '#61F3F3',
            main: '#00B8D9',
            dark: '#006C9C',
            darker: '#003768',
            contrastText: '#FFFFFF',
        },
        success: {
            lighter: '#D3FCD2',
            light: '#77ED8B',
            main: '#22C55E',
            dark: '#118D57',
            darker: '#065E49',
            contrastText: '#ffffff',
        },
    };

    return mode === 'light' ? light : dark;
}
