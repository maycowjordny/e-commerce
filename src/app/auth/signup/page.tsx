"use client"
import FormProvider from "@/components/form/form-provider";
import { Input } from "@/components/input";
import { signUpUserValidationSchema } from "@/schema/signup-user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SignupData = z.infer<typeof signUpUserValidationSchema>

export default function SignupPage() {

    const defaultValues = {
        name: "",
        email: "",
        password: "",
    }

    const methods = useForm<SignupData>({
        resolver: zodResolver(signUpUserValidationSchema),
        defaultValues
    })

    const { handleSubmit, formState: { isSubmitting }, reset } = methods

    const onSubmit = handleSubmit((data: SignupData) => {
        reset()
    })


    return (
        <FormProvider methods={methods} onSubmit={onSubmit} >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <Typography variant="h3">Bem vindo ao E-commerce</Typography>
                <Typography variant="subtitle2" marginBottom={3} fontWeight={400}>Sua loja online</Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}>
                    <Input
                        name="name"
                        label="Nome"
                    />
                    <Input
                        name="email"
                        label="Email"
                    />
                    <Input
                        name="password"
                        label="Senha"
                        type="password"
                    />
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        color="primary"
                        loading={isSubmitting}
                        variant="contained"
                        sx={{ padding: "0px 20px", height: "48px" }}
                    >
                        Cadastrar
                    </LoadingButton>
                    <Typography fontSize={13}>Ao se cadastrar você concorda com os nossos <Link color="primary" href="login" underline="none">Termos de uso</Link> e <Link color="primary" href="login" underline="none">Política de Privacidade</Link></Typography>
                    <Typography fontWeight={400} fontSize={14}>Já possui conta no E-commerce? <Link color="primary" href="/auth/signin" underline="none"> Entrar</Link></Typography>
                </Box>
            </Box>
        </FormProvider>
    );
}
