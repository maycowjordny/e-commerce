import { Product } from '@/interfaces/product';
import { deleteProduct } from '@/service/product-service';
import { concatImgUrl } from '@/utils/concat-img';
import { LoadingButton } from '@mui/lab';
import { Box, CardMedia, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { enqueueSnackbar } from 'notistack';
import { Dispatch, SetStateAction, useState } from 'react';
import FormDialog from './form-dialog';

type Props = {
    product: Product;
    setOpen: Dispatch<SetStateAction<boolean>>;
    fetchProducts: () => Promise<void>
};

export default function CardProduct({ product, fetchProducts }: Props) {
    const [open, setDialogOpen] = useState(false);
    const isAdmin = window.localStorage.getItem("isAdmin")

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(product.props.id)
            enqueueSnackbar("Produto deletado com sucesso", { variant: "success" })
            fetchProducts()
            setDialogOpen(false)
        } catch (err) {
            enqueueSnackbar("Erro ao deletar produto", { variant: "error" })
        }
    }


    return (
        <Card sx={{
            maxWidth: "266px",
            maxHeight: "349px",
            width: "100%",
            p: "24px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: 'relative',
        }}>
            <Box sx={{ display: "flex", position: 'absolute', top: 0, right: 0 }}>
                {
                    Boolean(isAdmin) && (
                        <>
                            <FormDialog
                                fetchProducts={fetchProducts}
                                open={open}
                                productId={product.props.id}
                                Icon={<IconEdit />}
                                onClick={() => setDialogOpen(true)}
                                onClose={() => setDialogOpen(false)}
                            />
                            <IconButton>
                                <IconTrash onClick={handleDeleteProduct} />
                            </IconButton>
                        </>
                    )
                }
            </Box>
            <CardMedia
                component="img"
                width={160}
                height={160}
                image={concatImgUrl(product.props.image)}
                alt={product.props.name}
            />
            <CardContent>
                <Box>
                    <Typography fontSize={16} variant='body1'>
                        {product.props.name}
                    </Typography>
                </Box>
                <Typography variant="body2" fontSize={24} fontWeight={600}>
                    R${product.props.price.toFixed(2)}
                </Typography>
            </CardContent>
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="primary"
                variant="contained"
                sx={{ padding: "0px 12px", height: "48px" }}
            >
                Comprar
            </LoadingButton>
        </Card>
    );
}