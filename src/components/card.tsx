import { Product } from '@/interfaces/product';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconDotsVertical } from '@tabler/icons-react';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import FormDialog from './form-dialog';

type Props = {
    name: string;
    productId: number;
    imageUrl: StaticImageData;
    price: number;
}

export default function CardProduct({ name, imageUrl, price, productId }: Props) {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);

    async function fetchProduct() {
        try {
            const response = await fetch(`http://localhost:3001/products/${productId}`);

            const data = await response.json();

            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    const handleClickOpen = async () => {
        await fetchProduct();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{
            maxWidth: "266px",
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
                    product={product}
                    productId={productId}
                    Icon={<IconDotsVertical />}
                    onClick={handleClickOpen}
                    open={open}
                    onClose={handleClose}
                />
            </Box>
            <Image src={imageUrl} alt={name} width={160} height={160} />
            <CardContent>
                <Box>
                    <Typography fontSize={16} variant='body1'>
                        {name}
                    </Typography>
                </Box>
                <Typography variant="body2" fontSize={24} fontWeight={600}>
                    R${price}
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

