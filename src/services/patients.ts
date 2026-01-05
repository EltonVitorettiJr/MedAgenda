import { supabase } from "./supabase";

interface PatientsDB {
  id: string;
  full_name: string;
  phone: string | null;
  guardian_name: string | null;
}

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
