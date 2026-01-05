import { Plus, Search } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import RenderPatients from "../components/RenderPatients";

const Patients = () => {
  return (
    <div>
      <div className="container-app flex flex-col gap-4">
        <div className="flex justify-start">
          <h1 className="text-4xl text-primary-500 font-bold">Pacientes</h1>
        </div>
        <div className="flex gap-3 justify-between">
          <Input
            icon={<Search className="h-4 w-4" />}
            placeholder="Pesquise um paciente..."
            fullWidth
          ></Input>
          <Button className="flex gap-2 w-3xs">
            <Plus />
            Adiconar Paciente
          </Button>
        </div>
        <RenderPatients />
      </div>
    </div>
  );
};

export default Patients;
