import { styled } from '@mui/material/styles';
import { forwardRef, useImperativeHandle } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    name: string;
    label: string;
    handleDrop: (file: File) => Promise<void>
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

const ImageUpload = forwardRef((prop: Props, ref) => {
    const { control } = useFormContext();
    useImperativeHandle(ref, () => {
        triggerUpload: () => {
            console.log("aaaaaaaaaa");

        }
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
                        console.log(e);

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