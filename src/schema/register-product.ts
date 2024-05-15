import { z } from "zod";

export const registerProductSchema = z.object({
    name: z.string().min(1, { message: "Campo nome é obrigatório" }),
    price: z.number().min(1, { message: "Campo preço é obrigatório" }),
    image: z.string()
});
