import { Product } from '@/interfaces/product';
import { registerProductSchema } from '@/schema/register-product';
import axiosInstance from '@/service/config-axios';
import { endpoints } from '@/service/endpoints';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton, ModalProps } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormProvider from './form/form-provider';
import { Input } from './input';
import InputCurrency from './input-currency';
import InputFileUpload from './input-file';

type RegisterProductValidationSchema = z.infer<typeof registerProductSchema>;

type FormDialogProps = {
    productId?: number;
    Icon: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label?: string;
    open: boolean;
    onClose: ModalProps['onClose'];
    product?: Product | null
} & DialogProps

export default function FormDialog({ productId, Icon, onClick, label, open, onClose, product }: FormDialogProps) {
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        setIsEditMode(!!productId);
    }, [productId]);

    const defaultValues = {
        name: "",
        price: 0,
        image: ""
    };

    const methods = useForm<RegisterProductValidationSchema>({
        resolver: zodResolver(registerProductSchema),
        defaultValues
    });

    const { handleSubmit, formState: { isSubmitting, isDirty }, reset, setValue, } = methods;

    const onSubmit = handleSubmit(async (data: RegisterProductValidationSchema) => {
        try {
            await axiosInstance.post(endpoints.product.create, {
                data: {
                    name: data.name,
                    price: data.price,
                    image: data.image
                }
            }, {
                headers: {
                    /* Authorization:`Bearer ${token}` */
                }
            })
            reset();
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    });

    useEffect(() => {
        if (product) {
            setValue('name', product.name, { shouldValidate: true });
            setValue('price', product.price, { shouldValidate: true });
        }
    }, [product, setValue]);

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <>
                {
                    productId ?
                        (

                            <IconButton onClick={onClick}>
                                {Icon}
                            </IconButton>
                        )
                        :
                        (
                            <Button
                                variant="contained"
                                onClick={onClick}
                                sx={{ padding: "0px 12px", height: "38px", marginBottom: "20px" }}
                                startIcon={Icon}
                            >
                                {label}
                            </Button>
                        )}
                <Dialog
                    open={open}
                    onClose={onClose}
                    PaperProps={{
                        component: 'form',
                    }}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle variant='h3'>
                        {isEditMode ? "Editar Produto" : "Cadastrar Produto"}
                    </DialogTitle>
                    <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Input
                            margin='dense'
                            name="name"
                            label="Nome"
                            variant="outlined"
                        />
                        <InputCurrency
                            name="price"
                            label="Preço"
                        />
                        <InputFileUpload name='image' label='Selecionar arquivo' />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={onClose as ButtonProps['onClick']}
                            variant='outlined'
                        >
                            Cancelar
                        </Button>
                        <LoadingButton
                            type="submit"
                            variant='contained'
                            sx={{ marginLeft: "10px" }}
                            disabled={!isDirty}
                            loading={isSubmitting}
                        >
                            {isEditMode ? "Salvar Alterações" : "Cadastrar"}
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </>
        </FormProvider>
    );
}