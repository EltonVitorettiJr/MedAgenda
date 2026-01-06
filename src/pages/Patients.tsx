import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import RenderPatients from "../components/RenderPatients";
import { patientSchema } from "../schemas/patientSchema";
import {
  createPatient,
  deletePatient,
  getPatients,
} from "../services/patients";
import type { PatientsData, PatientsType } from "../types/patients";

const Patients = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [patients, setPatients] = useState<PatientsType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();

      setPatients(data);
    };
    fetchPatients();
  }, []);

  const handleClose = () => {
    reset();
    setIsModalOpen(false);
  };

  const handleDelete = async (patientId: string) => {
    if (!patientId) {
      return;
    }

    if (confirm("Tem certeza que deseja deletar esse paciente?")) {
      try {
        await deletePatient(patientId);

        const updatedPatients = await getPatients();

        setPatients(updatedPatients);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao deletar paciente, tente novamente.");
      }
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PatientsData>({
    resolver: yupResolver(patientSchema) as Resolver<PatientsData>,
  });

  const onSubmit: SubmitHandler<PatientsData> = async (data) => {
    try {
      await createPatient(data);

      toast.success("Paciente cadastrado.");

      const updatedPatients = await getPatients();

      setPatients(updatedPatients);

      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar paciente. Tente novamente.");
    }
  };

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
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
          <Button
            className="flex gap-2 w-3xs"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus />
            Adiconar Paciente
          </Button>
        </div>
        <RenderPatients
          patients={filteredPatients}
          handleDelete={handleDelete}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          title="Cadastrar Paciente"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <Input label="Nome do Paciente" {...register("patientName")} />
              {errors.patientName?.message}
            </div>
            <div>
              <Input
                label="Nome do Responsável"
                {...register("guardianName")}
              />
              {errors.guardianName?.message}
            </div>
            <div>
              <Input label="Telefone" {...register("phone")} />
              {errors.phone?.message}
            </div>
            <Button isLoading={isSubmitting} type="submit">
              Cadastrar
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Patients;
