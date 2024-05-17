'use client';
import { FilterContext } from "@/Context/filter-context";
import CardProduct from "@/components/card";
import FormDialog from "@/components/form-dialog";
import { Product } from "@/interfaces/product";
import { getProducts } from "@/service/product-service";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { enqueueSnackbar } from "notistack";
import { useCallback, useContext, useEffect, useState } from "react";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState(false);
    const { filter } = useContext(FilterContext)
    const isAdmin = window.localStorage.getItem("isAdmin")

    const fetchProducts = useCallback(async () => {
        try {
            const response = await getProducts(filter);
            setProducts(response);
        } catch (error) {
            enqueueSnackbar("Erro ao listar produtos", { variant: "error" });
        }
    }, [filter]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Box display="flex" flexDirection="column" gap={8} alignItems="end">
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Typography fontSize={24} fontWeight={500}>Produtos</Typography>
                {
                    Boolean(isAdmin) && (
                        <FormDialog
                            open={open}
                            label="Cadastrar produto"
                            Icon={<IconPlus />}
                            onClick={() => setOpen(true)}
                            onClose={() => setOpen(false)}
                            fetchProducts={fetchProducts}
                        />
                    )
                }
            </Box>
            <Divider style={{ width: "100%" }} />
            <Grid container spacing={6}>
                {products.map(product => (
                    <Grid item xs={12} md={6} lg={3} key={product.props.id}>
                        <CardProduct
                            key={product.props.id}
                            product={product}
                            setOpen={setOpen}
                            fetchProducts={fetchProducts}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
