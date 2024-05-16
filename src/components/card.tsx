import { Product } from '@/interfaces/product';
import { concatImgUrl } from '@/utils/concat-img';
import { LoadingButton } from '@mui/lab';
import { Box, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconDotsVertical } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';
import FormDialog from './form-dialog';

type Props = {
    product: Product
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
}

export default function CardProduct({ product, setOpen, open }: Props) {


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
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}>
                <FormDialog
                    open={open}
                    productId={product.props.id}
                    Icon={<IconDotsVertical />}
                    onClick={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                />
            </Box>
            <CardMedia
                component="img"
                width={150}
                height={150}
                image={concatImgUrl(product?.props.image)}
                alt={concatImgUrl(product?.props.name)}
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
};

