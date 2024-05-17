import { FilledInput, styled } from '@mui/material';
import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    name: string;
    label: string;
    handleDrop: (file: File) => Promise<void>
};

const StyledFilledInput = styled(FilledInput)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    '&.Mui-focused': {
        backgroundColor: theme.palette.background.default,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
    '&:hover': {
        backgroundColor: theme.palette.background.default,
    },
    '& input': {
        display: 'block',
        width: '100%',
        height: '100%',
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: 'pointer',
    },
}));

const Label = styled('label')(({ theme }) => ({
    display: 'inline-block',
    cursor: 'pointer',
    padding: '10px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const ImageUpload = forwardRef((prop: Props, ref) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={prop.name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <Label>
                    {prop.label}
                    <StyledFilledInput
                        {...field}
                        inputRef={ref}
                        type="file"
                        onChange={(e: any) => {
                            field.onChange(prop.handleDrop(e.target.files[0]))
                        }}
                        value={field.value.filename}
                    />
                </Label>

            )}
        />
    );
})
ImageUpload.displayName = "ImageUpload"
export default ImageUpload