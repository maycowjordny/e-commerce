import { z } from "zod";

export const signUpUserValidationSchema = z.object({
    name: z.string().min(1, { message: "Campo nome é obrigatório" }),
    email: z.string()
        .min(1, { message: "Campo email é obrigatório" })
        .email({ message: "Email inválido" }),
    password: z.string()
        .regex(/^(?=.*[A-Z])/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/^(?=.*[a-z])/, "A senha deve conter pelo menos uma letra minúscula")
        .regex(/^(?=.*\d)/, "A senha deve conter pelo menos um número")
        .regex(/^(?=.*[`~<>?,./!@#$%^&*()\-_+="|{}[\];:])/, "A senha deve conter pelo menos um caractere especial")
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
})
