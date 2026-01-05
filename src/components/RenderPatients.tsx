import { useEffect, useState } from "react";
import { getPatients } from "../services/patients";
import type { PatientsData } from "../types/patients";
import Card from "./Card";

const RenderPatients = () => {
  const [patients, setPatients] = useState<PatientsData[]>();

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();

      setPatients(data);
    };
    fetchPatients();
  }, []);

  return (
    <div>
      <div className="container-app grid grid-cols-3 gap-2">
        {patients?.map((patient) => (
          <Card key={patient.id}>
            <h2>Paciente: {patient.fullName}</h2>
            {patient.guardianName && (
              <h3>Responsável: {patient.guardianName}</h3>
            )}
            <h4>Telefone: {patient.phone}</h4>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RenderPatients;
