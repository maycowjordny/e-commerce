import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    name: string;
    label: string;
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload({ name, label }: Props) {
    const { control } = useFormContext();
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Box display="flex" gap={2} alignItems="center">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        {label}
                        <VisuallyHiddenInput
                            type="file"
                            {...field}
                            onChange={handleFileChange}
                        />
                    </Button>
                    <span>{fileName}</span>
                </Box>
            )}
        />
    );
}