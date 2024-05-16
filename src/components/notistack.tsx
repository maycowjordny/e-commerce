'use client';
import { Slide } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { IconAlertCircle, IconCheck, IconExclamationCircle, IconInfoCircle, IconX } from '@tabler/icons-react';
import { SnackbarProvider as NotistackProvider, closeSnackbar } from 'notistack';
import { useRef } from 'react';

type Props = {
    children: React.ReactNode;
};

export default function SnackbarProvider({ children }: Props) {
    const notistackRef = useRef<any>(null);

    return (
        <NotistackProvider
            ref={notistackRef}
            maxSnack={5}
            preventDuplicate
            autoHideDuration={3500}
            TransitionComponent={Slide || undefined}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            iconVariant={{
                info: (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", borderRadius: "4px", paddingRight: "8px" }}>
                        <IconInfoCircle stroke={2} />
                    </span>
                ),
                success: (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", borderRadius: "4px", paddingRight: "8px" }}>
                        <IconCheck stroke={2} />
                    </span>
                ),
                warning: (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", borderRadius: "4px", paddingRight: "8px" }}>
                        <IconAlertCircle stroke={2} />
                    </span>
                ),
                error: (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", borderRadius: "4px", paddingRight: "8px" }}>
                        <IconExclamationCircle stroke={2} />
                    </span>
                ),
            }}
            action={(snackbarId) => (
                <IconButton size="medium" onClick={() => closeSnackbar(snackbarId)} sx={{ p: 0.5 }}>
                    <IconX stroke={2} color='white' />
                </IconButton>
            )}
        >
            {children}
        </NotistackProvider>
    );
}