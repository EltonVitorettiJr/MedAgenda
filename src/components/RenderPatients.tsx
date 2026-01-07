import { Pencil, Phone, ShieldUser, Trash, User } from "lucide-react";
import type { PatientsData, PatientsType } from "../types/patients";
import Card from "./Card";

interface RenderPatientsProps {
  patients: PatientsType[];
  handleDelete: (PatientId: string) => void;
  handleEdit: (patientId: string, data: PatientsData) => void;
}

const RenderPatients = ({
  patients,
  handleDelete,
  handleEdit,
}: RenderPatientsProps) => {
  return (
    <div>
      <div className="container-app grid grid-cols-3 gap-2">
        {patients.map((patient) => (
          <Card className="relative group transition-all" key={patient.id}>
            <button
              type="button"
              className="cursor-pointer transition-all opacity-0 group-hover:opacity-100 hover:text-yellow-500"
              onClick={() =>
                handleEdit(patient.id, {
                  patientName: patient.fullName,
                  guardianName: patient.guardianName,
                  phone: patient.phone,
                })
              }
            >
              <Pencil
                className="absolute top-2 left-2 hover:bg-yellow-100 p-1 rounded-md"
                size={26}
              />
            </button>

            <button
              type="button"
              className="cursor-pointer transition-all opacity-0 group-hover:opacity-100 hover:text-red-500"
              onClick={() => handleDelete(patient.id)}
            >
              <Trash
                className="absolute top-2 right-2 hover:bg-red-200 p-1 rounded-full"
                size={26}
              />
            </button>
            <div className="flex items-center justify-start gap-1.5 border-b border-gray-600 h-auto">
              <User size={16} />
              <h2>Paciente: {patient.fullName}</h2>
            </div>
            {patient.guardianName && (
              <div className="flex items-center justify-start gap-1.5 border-b border-gray-600 h-auto">
                <ShieldUser size={16} />
                <h3>Responsável: {patient.guardianName}</h3>
              </div>
            )}
            <div className="flex items-center justify-start gap-1.5 border-b border-gray-600 h-auto">
              <Phone size={16} />
              <h4>Telefone: {patient.phone}</h4>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RenderPatients;
