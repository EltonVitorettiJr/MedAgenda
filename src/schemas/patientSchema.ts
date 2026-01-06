import * as yup from "yup";

export const patientSchema = yup.object({
  patientName: yup.string().required("Nome obrigatório"),
  guardianName: yup.string().required("Responsável obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
});
