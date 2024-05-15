"use client"
import { componentsOverrides } from "@/theme/overrides";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { merge } from "lodash";
import { ReactNode, createContext, useMemo, useState } from "react";
import { palette } from "./palette";
import { shadows } from "./shadow";
import { typography } from "./typography";

type Props = {
    children: ReactNode;
};

type ColorModeContextType = {
    mode: PaletteMode;
    toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
    mode: "light",
    toggleColorMode: () => { },
});

export default function EcommerceThemeProvider({ children }: Props) {
    const [mode, setMode] = useState<PaletteMode>('light');

    const toggleColorMode = () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const themeSettings = useMemo(
        () => ({
            palette: {
                ...palette(mode),
            },
            shadows: shadows(mode),
            shape: { borderRadius: 8 },
            typography: typography,
        }),
        [mode]
    );

    const theme = createTheme(themeSettings as ThemeOptions);
    theme.components = merge(componentsOverrides(theme));

    return (
        <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
