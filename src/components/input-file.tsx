import { forwardRef, useImperativeHandle } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    name: string;
    label: string;
    handleDrop: (file: File) => Promise<void>
};

const ImageUpload = forwardRef((prop: Props, ref) => {
    const { control } = useFormContext();
    useImperativeHandle(ref, () => {

    })

    return (
        <Controller
            name={prop.name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <input
                    {...field}
                    multiple
                    type="file"
                    onChange={(e: any) => {
                        field.onChange(prop.handleDrop(e.target.files[0]))
                    }}
                    value={field.value.filename}
                />
            )}
        />
    );
})
ImageUpload.displayName = "ImageUpload"
export default ImageUpload