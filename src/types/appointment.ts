export type AppointmentType =
  (typeof AppointmentType)[keyof typeof AppointmentType];

export const HealthInsurance = {
  UNIMED: "UNIMED",
  PREVER: "PREVER",
  PARTICULAR: "PARTICULAR",
  CASSI: "CASSI",
};

export type HealthInsurance =
  (typeof HealthInsurance)[keyof typeof HealthInsurance];

export const AppointmentType = {
  CONSULTA: "CONSULTA",
  RETORNO: "RETORNO",
} as const;

export interface AppointmentData {
  patientName: string;
  notes?: string;
  start: string;
  end: string;
  phone: string;
  guardianName: string;
  healthInsurance: HealthInsurance;
  appointmentType: AppointmentType;
}
export interface AppointmentEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    notes: string | null;
    patientId: string;
    healthInsurance: HealthInsurance;
    appointmentType: AppointmentType;
    phone: string | null;
    guardianName: string | null;
  };
  backgroundColor: string;
}
