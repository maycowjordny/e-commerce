import { CurrencyInput } from 'react-currency-mask';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from './input';

type CurrencyInputProps = {
    name: string,
    label: string,
};

export default function InputCurrency({ name, label }: CurrencyInputProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <CurrencyInput
                    value={field.value}
                    onChangeValue={(_, value) => {
                        field.onChange(value);
                    }}
                    InputElement={<Input name={name} label={label} />}
                />
            )}
        />
    );
};