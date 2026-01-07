import type {
  AppointmentData,
  AppointmentEvent,
  AppointmentType,
} from "../types/appointment";
import { supabase } from "./supabase";

interface AppointmentsDB {
  id: string;
  start_time: string;
  end_time: string;
  notes: string | null;
  patient_id: string;
  health_insurance: string;
  appointment_type: string;
  patients: {
    full_name: string;
    phone: string;
    guardian_name: string;
  };
}

export const createAppointment = async (
  data: AppointmentData,
): Promise<boolean> => {
  const patientId = data.patientId;

  if (!patientId) {
    throw new Error(`Paciente não encontrado ou não cadastrado.`);
  }

  if (data.phone || data.guardianName) {
    await supabase
      .from("patients")
      .update({ phone: data.phone, guardian_name: data.guardianName })
      .eq("id", patientId);
  }

  const { error: appointmentError } = await supabase
    .from("appointments")
    .insert({
      patient_id: patientId,
      start_time: data.start,
      end_time: data.end,
      notes: data.notes,
      health_insurance: data.healthInsurance,
      appointment_type: data.appointmentType,
    });

  if (appointmentError) {
    throw new Error(`Erro ao criar agendamento: ${appointmentError.message}`);
  }

  return true;
};

export const getAppointments = async () => {
  const { data, error } = await supabase.from("appointments").select(`
      id,
      start_time,
      end_time,
      notes,
      patient_id,
      health_insurance,
      appointment_type,
      patients ( full_name, phone, guardian_name )
    `);

  if (error) {
    throw new Error(error.message);
  }

  const appointments = data as unknown as AppointmentsDB[];

  const formattedAppointments: AppointmentEvent[] = appointments.map(
    (appointment) => ({
      id: appointment.id,
      title: appointment.patients.full_name,
      start: appointment.start_time,
      end: appointment.end_time,
      extendedProps: {
        notes: appointment.notes,
        patientId: appointment.patient_id,
        healthInsurance: appointment.health_insurance,
        appointmentType: appointment.appointment_type as AppointmentType,
        phone: appointment.patients.phone,
        guardianName: appointment.patients.guardian_name,
      },
      backgroundColor:
        appointment.appointment_type === "RETORNO" ? "#F59E0B" : "#0EA5E9",
      borderColor: "transparent",
    }),
  );

  return formattedAppointments;
};

export const editAppointment = async (
  appointmentId: string,
  data: AppointmentData,
) => {
  const { error: appointmentError } = await supabase
    .from("appointments")
    .update({
      patient_id: data.patientId,
      start_time: data.start,
      end_time: data.end,
      notes: data.notes,
      health_insurance: data.healthInsurance,
      appointment_type: data.appointmentType,
    })
    .eq("id", appointmentId);

  if (appointmentError) {
    throw new Error(appointmentError.message);
  }
};

export const deleteAppointment = async (appointmentId: string) => {
  const { error: deleteAppointmentError } = await supabase
    .from("appointments")
    .delete()
    .eq("id", appointmentId);

  if (deleteAppointmentError) {
    throw new Error(deleteAppointmentError.message);
  }
};
