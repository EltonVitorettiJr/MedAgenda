import * as yup from "yup";

export const appointmentSchema = yup.object({
  patientName: yup.string().required("O nome do paciente é obrigatório."),
  notes: yup.string().optional(),
  start: yup.string().required("A data de inicio é obrigatória."),
  end: yup.string().required("A data de término é obrigatória."),
});
