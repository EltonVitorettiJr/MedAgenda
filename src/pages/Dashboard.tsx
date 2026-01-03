import type { DateSelectArg } from "@fullcalendar/core/index.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import { useState } from "react";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import Agenda from "../components/Agenda";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { appointmentSchema } from "../schemas/appointmentSchema";
import type { AppointmentType } from "../types/appointment";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (arg: DateSelectArg) => {
    const dataInicio = arg.startStr.slice(0, 16);
    const dataFim = arg.endStr.slice(0, 16);

    setValue("start", dataInicio);
    setValue("end", dataFim);

    setIsModalOpen(true);
  };

  const handleClose = () => {
    reset();

    setIsModalOpen(!isModalOpen);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentType>({
    resolver: yupResolver(appointmentSchema) as Resolver<AppointmentType>,
  });

  const onSubmit: SubmitHandler<AppointmentType> = async (data) => {
    console.log("Dados para salvar no Supabase:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleClose();
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="container-app">
        <div className="flex items-center justify-between space-y-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">MedAgenda</h1>
            <h2 className="text-gray-500 text-sm">
              Gerencie os agendamentos do dia.
            </h2>
          </div>

          <Button
            className="bg-primary-500 hover:bg-primary-600 text-white
            px-4 py-2 rounded-md font-medium transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="mr-1" /> Novo Agendamento
          </Button>
        </div>

        <div className="w-237.5">
          <Agenda events={[]} onSelectSlot={handleDateClick} />
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          title="Novo Agendamento"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <Input
                label="Nome do Paciente"
                {...register("patientName")}
                type="text"
                placeholder="Carlos"
                error={!!errors.patientName}
              />
              <span className="text-red-500 min-h-5 text-sm">
                {errors.patientName?.message}
              </span>
            </div>

            <div className="mb-2 grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="Início"
                  {...register("start")}
                  type="datetime-local"
                  placeholder="__/__/___"
                  error={!!errors.start}
                />
                <span className="text-red-500 min-h-5 text-sm">
                  {errors.start?.message}
                </span>
              </div>

              <div>
                <Input
                  label="Término"
                  {...register("end")}
                  type="datetime-local"
                  placeholder="__/__/___"
                  error={!!errors.start}
                />
                <span className="text-red-500 min-h-5 text-sm">
                  {errors.start?.message}
                </span>
              </div>
            </div>

            <div>
              <Input
                label="Observação"
                {...register("notes")}
                type="text"
                placeholder="Ex: nome do remédio, etc..."
                fullWidth
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button onClick={handleClose}>Cancelar</Button>

              <Button type="submit" isLoading={isSubmitting}>
                Agendar
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
