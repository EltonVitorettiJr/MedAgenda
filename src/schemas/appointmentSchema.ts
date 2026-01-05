import * as yup from "yup";

export const appointmentSchema = yup.object({
  patientName: yup.string().required("Nome obrigatório"),
  guardianName: yup.string().required("Responsável obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
  healthInsurance: yup.string().required("Convênio obrigatório"),
  appointmentType: yup.string().required("Tipo obrigatório"),
  notes: yup.string().optional(),
  start: yup.string().required(),
  end: yup.string().required(),
});
