import type { PatientsData } from "../types/patients";
import { supabase } from "./supabase";

interface PatientsDB {
  id: string;
  full_name: string;
  phone: string;
  guardian_name: string;
}

export const createPatient = async (data: PatientsData): Promise<void> => {
  const { data: existingPatient } = await supabase
    .from("patients")
    .select("id")
    .eq("full_name", data.patientName)
    .eq("phone", data.phone)
    .maybeSingle();

  if (existingPatient) {
    console.log("Este paciente já esta cadastrado.");
  }

  const { error } = await supabase
    .from("patients")
    .insert({
      full_name: data.patientName,
      phone: data.phone,
      guardian_name: data.guardianName,
    })
    .single();

  if (error) {
    console.log("Erro ao cadastrar paciente, tente novamente.");
  }
  console.log("Paciente cadastrado com sucesso.");
};

export const getPatients = async () => {
  const { data, error } = await supabase.from("patients").select(`
      id,
      full_name,
      phone,
      guardian_name
    `);

  if (error) {
    throw new Error(error.message);
  }

  const patients = data as PatientsDB[];

  const formatedPatients = patients.map((patient) => ({
    id: patient.id,
    fullName: patient.full_name,
    phone: patient.phone,
    guardianName: patient.guardian_name,
  }));

  return formatedPatients;
};

export const deletePatient = async (patientId: string) => {
  const { error: deletePatientError } = await supabase
    .from("patients")
    .delete()
    .eq("id", patientId);

  if (deletePatientError) {
    throw new Error(deletePatientError.message);
  }
};
