import type {
  AppointmentData,
  AppointmentEvent,
  AppointmentType,
  HealthInsurance,
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
    phone: string | null;
    guardian_name: string | null;
  } | null;
}

export const createAppointment = async (
  data: AppointmentData,
): Promise<boolean> => {
  let patientId = "";

  const { data: existingPatient } = await supabase
    .from("patients")
    .select("id")
    .eq("full_name", data.patientName)
    .eq("phone", data.phone)
    .maybeSingle();

  if (existingPatient) {
    console.log("Este paciente já existe, reaproveitando id...");
    patientId = existingPatient.id;

    await supabase
      .from("patients")
      .update({ phone: data.phone })
      .eq("id", patientId);
  } else {
    console.log("Paciente novo, cadastrando...");

    const { data: newPatient, error: patientError } = await supabase
      .from("patients")
      .insert({
        full_name: data.patientName,
        phone: data.phone,
        guardian_name: data.guardianName,
      })
      .select("id")
      .single();

    if (patientError) {
      throw new Error(`Erro ao criar paciente: ${patientError.message}`);
    }

    patientId = newPatient.id;
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
      title: appointment.patients?.full_name || "Sem Nome",
      start: appointment.start_time,
      end: appointment.end_time,
      extendedProps: {
        notes: appointment.notes,
        patientId: appointment.patient_id,
        healthInsurance: appointment.health_insurance as HealthInsurance,
        appointmentType: appointment.appointment_type as AppointmentType,
        phone: appointment.patients?.phone ?? null,
        guardianName: appointment.patients?.guardian_name ?? null,
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
  patient_id: string,
  data: AppointmentData,
) => {
  const { error: patientError } = await supabase
    .from("appointments")
    .update({
      full_name: data.patientName,
      phone: data.phone,
      guardian_name: data.guardianName,
    })
    .eq("id", patient_id);

  if (patientError) {
    throw new Error(patientError.message);
  }

  const { error: appointmentError } = await supabase
    .from("appointments")
    .update({
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
