import * as yup from "yup";

export const userSchema = yup.object({
  email: yup.string().required("O email é obrigatório."),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .min(6, "A senha deve ser maior que 6 caracteres"),
});

export type UserType = yup.InferType<typeof userSchema>;
