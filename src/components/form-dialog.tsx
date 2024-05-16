import { Product } from '@/interfaces/product';
import { registerProductSchema } from '@/schema/register-product';
import axiosInstance from '@/service/config-axios';
import { endpoints } from '@/service/endpoints';
import { concatImgUrl } from '@/utils/concat-img';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton, ModalProps } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormProvider from './form/form-provider';
import { Input } from './input';
import InputCurrency from './input-currency';
import ImageUpload from './input-file';

type RegisterProductValidationSchema = z.infer<typeof registerProductSchema>;

type FormDialogProps = {
    productId?: string;
    Icon: React.ReactNode;
    label?: string;
    open: ModalProps['open'];
    onClose: ModalProps['onClose'];
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    product?: Product | null
} & DialogProps

export default function FormDialog({ productId, Icon, label, onClose, onClick, open }: FormDialogProps) {
    const [product, setProduct] = useState<Product>({} as Product);


    const formValue = useMemo(() => ({
        name: product?.props?.name,
        price: product?.props?.price,
        image: concatImgUrl(product?.props?.image),
    }), [product])

    const ref = useRef()
    const router = useRouter()
    const token = Cookies.get('Auth');

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

    const { handleSubmit, formState: { isSubmitting, isDirty }, reset, setValue, } = methods;

    const onSubmit = handleSubmit(async (data: RegisterProductValidationSchema) => {
        try {
            if (productId) {
                await axiosInstance.put(endpoints.product.update(productId), {
                    name: data.name,
                    price: data.price,
                    image: data.image === concatImgUrl(product?.props.image) ? undefined : data.image
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            } else {
                await axiosInstance.post(endpoints.product.create, {
                    name: data.name,
                    price: data.price,
                    image: data.image
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            enqueueSnackbar("Produto cadastrado com sucesso", { variant: "success" })
            reset();

        } catch (error) {
            enqueueSnackbar("Erro ao cadastrar produto", { variant: "error" })
        }
    });



    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axiosInstance.get(endpoints.product.getById(productId), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        fetchProduct()
    }, [token, productId])

    const handleDrop = async (file: File | undefined) => {
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async () => {
            const base64Image = reader.result as string;
            setValue("image", base64Image);
        };

        reader.readAsDataURL(file);
    }


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