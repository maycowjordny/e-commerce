'use client';
import { FilterContext } from "@/Context/filter-context";
import CardProduct from "@/components/card";
import FormDialog from "@/components/form-dialog";
import { Product } from "@/interfaces/product";
import { getProducts } from "@/service/product-service";
import { Box, Divider, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState(false);
    const { filter } = useContext(FilterContext)

    async function fetchProducts() {
        try {
            const response = await getProducts(filter);
            setProducts(response);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box display="flex" flexDirection="column" gap={8} alignItems="end">
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Typography fontSize={24} fontWeight={500}>Produtos</Typography>
                <FormDialog
                    open={open}
                    label="Cadastrar produto"
                    Icon={<IconPlus />}
                    onClick={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    fetchProducts={fetchProducts}
                />
            </Box>
            <Divider style={{ width: "100%" }} />
            <Box display="flex" flexWrap="wrap" gap="16px" alignItems="center" justifyContent="space-between">
                {products.map(product => (
                    <CardProduct
                        key={product.props.id}
                        product={product}
                        setOpen={setOpen}
                    />
                ))}
            </Box>
        </Box>
    );
}
