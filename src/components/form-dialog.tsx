import { Product } from '@/interfaces/product';
import { registerProductSchema } from '@/schema/register-product';
import { createProduct, getProductById, updateProduct } from '@/service/product-service';
import { concatImgUrl } from '@/utils/concat-img';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton, ModalProps } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormProvider from './form/form-provider';
import { Input } from './input';
import InputCurrency from './input-currency';
import ImageUpload from './input-file';

export type RegisterProductValidationSchema = z.infer<typeof registerProductSchema>;

type FormDialogProps = {
    productId?: string;
    Icon: React.ReactNode;
    label?: string;
    open: ModalProps['open'];
    fetchProducts: () => Promise<void>
    onClose: ModalProps['onClose'];
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & DialogProps

export default function FormDialog({ productId, Icon, label, onClose, onClick, open, fetchProducts }: FormDialogProps) {
    const [product, setProduct] = useState<Product>({} as Product);

    const formValue = useMemo(() => ({
        name: product?.props?.name,
        price: product?.props?.price,
        image: concatImgUrl(product?.props?.image),
    }), [product]);

    const ref = useRef();

    const defaultValues = {
        name: "",
        price: 0,
        image: ""
    };

    const methods = useForm<RegisterProductValidationSchema>({
        resolver: zodResolver(registerProductSchema),
        defaultValues,
        values: formValue
    });

    const { handleSubmit, formState: { isSubmitting, isDirty }, reset, setValue } = methods;

    const onSubmit = handleSubmit(async (data: RegisterProductValidationSchema) => {
        try {
            if (productId) {
                await updateProduct(productId, data);
                enqueueSnackbar("Produto atualizado produto", { variant: "success" });
            } else {
                await createProduct(data);
                enqueueSnackbar("Produto cadastrado com sucesso", { variant: "success" });
            }

            fetchProducts();
            reset();
        } catch (error) {
            enqueueSnackbar("Erro no produto", { variant: "error" });
        }
    });

    const handleDrop = async (file: File | undefined) => {
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async () => {
            const base64Image = reader.result as string;
            setValue("image", base64Image);
        };

        reader.readAsDataURL(file);
    }

    useEffect(() => {
        async function fetchProduct() {
            try {
                if (!productId) return;
                const response = await getProductById(productId);
                setProduct(response);
                reset(response.props);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        fetchProduct();
    }, [productId, reset]);

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <>
                {productId ? (
                    <IconButton onClick={onClick}>
                        {Icon}
                    </IconButton>
                ) : (
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
                        {productId ? "Editar Produto" : "Cadastrar Produto"}
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
                        <ImageUpload name='image' label='Selecionar arquivo' ref={ref} handleDrop={handleDrop} />
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
                            {productId ? "Salvar Alterações" : "Cadastrar"}
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </>
        </FormProvider>
    );
}
