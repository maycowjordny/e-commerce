import TextField, { TextFieldProps } from '@mui/material/TextField';
import masks, { MasksName } from '@nafuzi/brazilian-masks';
import { Controller, useFormContext } from 'react-hook-form';

type Props = TextFieldProps & {
    name: string;
    mask?: MasksName;
};

export function Input({ name, helperText, type, mask, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    inputRef={ref}
                    type={type}
                    value={type === 'number' && field.value === 0 ? '' : field.value}
                    onChange={(event) => {
                        if (mask) {
                            const maskedValue = masks[mask](event.target.value)
                            field.onChange(maskedValue)
                        } else {
                            if (type === 'number') {
                                field.onChange(Number(event.target.value));
                            } else {
                                field.onChange(event.target.value);
                            }
                        }
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                />
            )}
        />
    );
}