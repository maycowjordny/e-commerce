'use client'
import ProductCard from "@/components/card";
import FormDialog from "@/components/form-dialog";
import { Product } from "@/interfaces/product";
import { Box, Divider, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`http://localhost:3001/products`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        fetchProduct()
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box display="flex" flexDirection="column" gap={8} alignItems="end">
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Typography fontSize={24} fontWeight={500}>Produtos</Typography>
                <FormDialog
                    label="Cadastrar produto"
                    Icon={<IconPlus />}
                    onClick={handleClickOpen}
                    open={open}
                    onClose={handleClose}
                />
            </Box>
            <Divider style={{ width: "100%" }} />
            <Box display="flex" flexWrap="wrap" gap="16px" alignItems="center" justifyContent="space-between">
                {
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            price={product.price}
                            productId={product.id}
                        />
                    ))
                }
            </Box>
        </Box>
    );
}


