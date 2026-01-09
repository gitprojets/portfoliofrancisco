import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Mensagem é obrigatória" })
    .max(1000, { message: "Mensagem deve ter no máximo 1000 caracteres" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
