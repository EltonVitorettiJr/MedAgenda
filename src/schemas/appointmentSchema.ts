import * as yup from "yup";

export const appointmentSchema = yup.object({
  patientId: yup.string().required("O paciente é obrigatório."),
  guardianName: yup.string().required("O Responsável é obrigatório."),
  phone: yup.string().required("O Telefone é obrigatório."),
  healthInsurance: yup.string().required("O Convênio é obrigatório."),
  appointmentType: yup.string().required("Tipo obrigatório"),
  notes: yup.string().optional(),
  start: yup.string().required(),
  end: yup.string().required(),
});
